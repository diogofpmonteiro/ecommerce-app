import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";
import { isSuperAdmin } from "@/lib/access";

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  tenantsCollectionSlug: "tenants",
  arrayFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
});

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    update: ({ req, id }) => {
      // only allow users to edit their own info in the /admin dashboard cms
      if (isSuperAdmin(req.user)) return true;
      return req.user?.id === id;
    },
  },
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
    },
    {
      admin: {
        position: "sidebar",
      },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"],
      // guarantee role can't be changed by regular users
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: "sidebar",
      },
    },
  ],
};
