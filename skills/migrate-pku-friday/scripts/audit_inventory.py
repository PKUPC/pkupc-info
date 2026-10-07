#!/usr/bin/env python3
"""Audit the project's Markdown migration snapshot without changing content."""
import argparse
import html
import json
from pathlib import Path
import re
import unicodedata


def title_key(value):
    value = value.strip().strip('"\'')
    value = re.sub(r'^【[^】]+】', '', value)
    return re.sub(r'\s+', '', unicodedata.normalize('NFKC', value))


def local_inventory(repo):
    result = {}
    for path in sorted((repo / 'content/wechat-official-account/mise').glob('*.mdx')):
        text = path.read_text(encoding='utf-8')
        front = re.match(r'^---\s*\n(.*?)\n---', text, re.S)
        if not front:
            raise ValueError(f'Missing front matter: {path}')
        fields = {}
        for name in ('title', 'date', 'slug'):
            match = re.search(rf'^{name}:\s*(.+)$', front[1], re.M)
            if not match:
                raise ValueError(f'Missing {name}: {path}')
            fields[name] = match[1].strip().strip('"\'')
        fields['file'] = path.relative_to(repo).as_posix()
        fields['has_solution'] = '<Solution' in text
        fields['has_answer_check'] = '<AnswerCheck' in text
        key = (fields['date'][:10], title_key(fields['title']))
        result.setdefault(key, []).append(fields)
    return result


def audit(repo, status):
    local = local_inventory(repo)
    rows, pending, conflicts, seen = [], [], [], set()
    for line in status.read_text(encoding='utf-8').splitlines():
        cells = [x.strip() for x in line.strip().strip('|').split('|')]
        if len(cells) not in (4, 5) or not cells[0].isdigit():
            continue
        # The final four-column summary repeats heise posts without filenames.
        if len(cells) == 4 and not re.fullmatch(r'`(?:mise|heise)-\d+\.mdx`', cells[3]):
            continue
        if len(cells) == 4:
            cells.insert(3, '')
        number, date, title, fourth, fifth = cells
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', date):
            raise ValueError(f'Invalid snapshot date: {line}')
        number = int(number)
        if number in seen:
            raise ValueError(f'Duplicate album position: {number}')
        seen.add(number)
        key = (date, title_key(title))
        matches = local.get(key, [])
        link = re.search(r'\]\((https?://[^)]+)\)', fifth)
        row = {'album_position': number, 'date': date, 'title': title,
               'type': fourth if link else ('黑色星期五' if 'heise-' in fifth else '谜色星期五'),
               'source_url': html.unescape(link[1]) if link else None,
               'source_evidence': 'user-provided snapshot; article body not verified',
               'local_files': [x['file'] for x in matches]}
        if len(matches) > 1:
            row['status'] = 'conflict'
            conflicts.append({'album_position': number, 'reason': 'Multiple local title/date matches'})
        elif matches:
            row['status'] = 'local_present_unverified'
            row['has_solution'] = matches[0]['has_solution']
            row['has_answer_check'] = matches[0]['has_answer_check']
            if not link and Path(fifth.strip('`')).name != Path(matches[0]['file']).name:
                conflicts.append({'album_position': number, 'reason': 'Snapshot filename differs from local match'})
        else:
            row['status'] = 'needs_source_review'
            row['solution_status'] = 'unknown'
            row['source_url'] = row['source_url'] or None
            pending.append(row)
            if not link:
                conflicts.append({'album_position': number, 'reason': 'Snapshot says migrated but no local match'})
        rows.append(row)
    if not rows:
        raise ValueError('No supported inventory rows found; expected local-file or source-link Markdown tables')
    rows.sort(key=lambda x: x['album_position'])
    positions = {x['album_position'] for x in rows}
    missing = sorted(set(range(1, max(positions) + 1)) - positions)
    matched_files = {p for row in rows for p in row['local_files']}
    unmatched = [x['file'] for matches in local.values() for x in matches if x['file'] not in matched_files]
    return {'snapshot': status.name, 'articles_in_snapshot': len(rows),
            'local_article_count': sum(map(len, local.values())),
            'local_matched_articles': sum(bool(x['local_files']) for x in rows),
            'pending_article_count': len(pending),
            'snapshot_position_gaps': missing, 'unmatched_local_files': unmatched,
            'completion_semantics': 'Local presence is not verified migration completion; pending includes solution-only posts.',
            'conflicts': conflicts, 'articles': rows, 'pending': pending}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--status', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = audit(args.repo.resolve(), args.status)
    # Create exclusively: do not silently replace earlier evidence.
    with args.output.open('x', encoding='utf-8') as output:
        json.dump(result, output, ensure_ascii=False, indent=2)
        output.write('\n')
    print(json.dumps({k: result[k] for k in ('articles_in_snapshot', 'local_article_count',
          'local_matched_articles', 'pending_article_count', 'snapshot_position_gaps',
          'unmatched_local_files', 'conflicts')}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
