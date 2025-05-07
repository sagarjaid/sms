/** @format */

import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY environment variable');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('Missing NOTION_DATABASE_ID environment variable');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const databaseId = process.env.NOTION_DATABASE_ID;

export interface BlogPost {
  id: string;
  title: string;
  subTitle?: string;
  slug: string;
  coverImage?: string;
  publishedAt: string;
  status: string;
  tags?: string[];
  author?: string;
}

function extractAuthor(authorProp: any): string {
  if (!authorProp) return '';
  if (authorProp.people && authorProp.people.length > 0) {
    return authorProp.people[0].name || '';
  }
  if (authorProp.rich_text && authorProp.rich_text.length > 0) {
    return authorProp.rich_text[0].plain_text || '';
  }
  return '';
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'status',
      status: { equals: 'Live' },
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  });

  return response.results
    .map((page) => {
      if (!('properties' in page)) return null;
      const properties = page.properties as any;
      return {
        id: page.id,
        title: properties['title']?.title?.[0]?.plain_text || '',
        subTitle: properties['sub-title']?.rich_text?.[0]?.plain_text || '',
        slug: properties['slug']?.rich_text?.[0]?.plain_text || '',
        coverImage:
          properties['featured-image']?.files?.[0]?.file?.url ||
          properties['featured-image']?.files?.[0]?.external?.url ||
          '',
        publishedAt: properties['date']?.date?.start || '',
        status: properties['status']?.status?.name || '',
        tags:
          properties['tags']?.multi_select?.map((tag: any) => tag.name) || [],
        author: extractAuthor(properties['author']),
      };
    })
    .filter(Boolean) as BlogPost[];
}

// Test function to log blog posts
export async function testNotionConnection() {
  const posts = await getBlogPosts();
  // eslint-disable-next-line no-console
  console.log('Fetched blog posts:', posts);
  return posts;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results.find((p) => 'properties' in p);
  if (!page) return null;
  const properties = (page as any).properties;
  return {
    id: page.id,
    title: properties['title']?.title?.[0]?.plain_text || '',
    subTitle: properties['sub-title']?.rich_text?.[0]?.plain_text || '',
    slug: properties['slug']?.rich_text?.[0]?.plain_text || '',
    coverImage:
      properties['featured-image']?.files?.[0]?.file?.url ||
      properties['featured-image']?.files?.[0]?.external?.url ||
      '',
    publishedAt: properties['date']?.date?.start || '',
    status: properties['status']?.status?.name || '',
    tags: properties['tags']?.multi_select?.map((tag: any) => tag.name) || [],
    author: extractAuthor(properties['author']),
  };
}

export async function getNotionBlocks(pageId: string) {
  const response = await notion.blocks.children.list({ block_id: pageId });
  return response.results;
}
