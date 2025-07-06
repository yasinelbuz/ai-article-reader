/* eslint-disable @typescript-eslint/no-explicit-any */
'server-only';

import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

function getPlainText(field?: { plain_text?: string }[] | null): string {
  return Array.isArray(field) && field.length > 0 ? field[0]?.plain_text ?? '' : '';
}

export async function getPosts(language: string = 'English') {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: { equals: true },
          },
          {
            property: 'Language',
            select: { equals: language.charAt(0).toUpperCase() + language.slice(1).toLowerCase() },
          },
        ],
      },
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: getPlainText(page.properties.Title?.title),
      content: getPlainText(page.properties.Content?.rich_text),
      content_summary: getPlainText(page.properties.Content_Summary?.rich_text),
      published: page?.properties?.Published?.checkbox,
      category: page.properties.Category.select?.name || 'No Category',
      created_time: page?.created_time,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostByID(id: string) {
  const page: any = await notion.pages.retrieve({ page_id: id });

  return {
    id: page.id,
    title: getPlainText(page.properties.Title?.title),
    content: getPlainText(page.properties.Content?.rich_text),
    content_summary: getPlainText(page.properties.Content_Summary?.rich_text),
    published: page?.properties?.Published?.checkbox,
    category: page.properties.Category.select?.name || 'No Category',
    created_time: page?.created_time,
  };
}
