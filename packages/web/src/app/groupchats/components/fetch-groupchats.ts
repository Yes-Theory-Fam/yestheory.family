import type {SearchClient} from 'typesense';
import type {Groupchat_Platform} from '../../../__generated__/graphql';
import {type GroupchatResult} from './use-groupchat-search';

const pageSize = 15;

export const fetchResults = async (
  queryText: string,
  platforms: Groupchat_Platform[],
  searchClient: SearchClient,
  page = 1,
): Promise<[GroupchatResult[], hasNext: boolean]> => {
  const filterBy =
    platforms.length === 0 ? '' : `platform:[${platforms.join(',')}]`;

  const {
    hits,
    found,
    page: returnedPage,
  } = await searchClient
    .collections<GroupchatResult>('groupchats')
    .documents()
    .search(
      {
        q: queryText,
        query_by: 'name,keywords,description',
        filter_by: filterBy,
        sort_by: 'promoted:desc',
        per_page: pageSize,
        page,
      },
      {},
    );

  const results =
    hits
      ?.map((h) => h.document)
      .filter((x): x is GroupchatResult => 'name' in x) ?? [];

  const hasNext = returnedPage * pageSize < found;

  return [results, hasNext];
};
