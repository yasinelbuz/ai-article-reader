"server-only"

import { reverseSlug } from '@/utils/slug-generator';
import { Client } from '@notionhq/client';


const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;


export async function getPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text || 'No Title',
    content: page.properties.Content?.rich_text?.[0]?.plain_text || '',
    content_summary: page.properties.Content_Summary?.rich_text?.[0]?.plain_text || '',
    published: page.properties.Published.checkbox,
    category: page.properties.Category.select?.name || 'No Category',
    created_time: page.created_time,
  }));
}

export async function getPostByID(id:string) {
  const page:any = await notion.pages.retrieve({ page_id: id });

return {
  id: page.id,
  title: page.properties.Title.title[0]?.plain_text || 'No Title',
  content: page.properties.Content?.rich_text?.[0]?.plain_text || '',
  content_summary: page.properties.Content_Summary?.rich_text?.[0]?.plain_text || '',
  published: page.properties.Published.checkbox,
  category: page.properties.Category.select?.name || 'No Category',
  created_time: page.created_time,
};

}