import { sqliteTable, index, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { auditSchema } from "@schema/audit";
import * as users from "@schema/users";
import { isAdminOrEditor, isAdminOrUser } from "db/config-helpers";
import type { ApiConfig } from "db/routes";

export const tableName = "pages";

export const route = "pages";
export const name = "Pages";
export const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18a8.967 8.967 0 0 1-6 2.292m0-14.25v14.25" />
</svg>`;

export const definition = {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  status: text("status").notNull().default("draft"), // draft, published
  userId: text("userId").notNull(),
  image: text("image"),
  images: text("images", { mode: "json" }).$type<string[]>(),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
};

export const table = sqliteTable(
  tableName,
  {
    ...definition,
    ...auditSchema,
  },
  (table) => {
    return {
      slugIndex: index("pageSlugIndex").on(table.slug),
      userIdIndex: index("pageUserIdIndex").on(table.userId),
      statusIndex: index("pageStatusIndex").on(table.status),
    };
  }
);

export const relation = relations(table, ({ one }) => ({
  user: one(users.table, {
    fields: [table.userId],
    references: [users.table.id],
  }),
}));

export const access: ApiConfig["access"] = {
  operation: {
    read: true,
    create: isAdminOrEditor,
    update: isAdminOrUser,
    delete: isAdminOrEditor,
  },
  fields: {
    userId: {
      update: false,
    },
  },
};

export const hooks: ApiConfig["hooks"] = {
  resolveInput: {
    create: (ctx, data) => {
      if (ctx.locals.user?.id) {
        data.userId = ctx.locals.user.id;
      }
      return data;
    },
    update: (ctx, id, data) => {
      if (ctx.locals.user?.id) {
        data.userId = ctx.locals.user.id;
      }
      return data;
    },
  },
};

export const fields: ApiConfig["fields"] = {
  id: {
    type: "id",
  },
  slug: {
    type: "textField",
  },
  title: {
    type: "textField",
  },
  content: {
    type: "textArea",
  },
  excerpt: {
    type: "textArea",
  },
  status: {
    type: "textField",
  },
  image: {
    type: "file",
    bucket: (ctx) => ctx.locals.runtime.env.R2,
    path: "images",
  },
  images: {
    type: "file[]",
    bucket: (ctx) => ctx.locals.runtime.env.R2,
    path: "images",
  },
  tags: {
    type: "string[]",
  },
  updatedOn: {
    type: "datetime",
  },
};
