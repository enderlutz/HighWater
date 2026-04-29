-- Adds the "must_change_password" flag used by the pre-provisioned account
-- flow. When true, the middleware redirects the user to /account/password
-- and won't let them reach the rest of the app until they set a new password.

alter table profiles
  add column if not exists must_change_password boolean not null default false;
