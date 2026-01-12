import { useItemProvider, ICustomItemProviderOptions, ICustomItemProviderSearchOptions, IItemProviderHookElementSearchOnly, ICustomItemProviderSearchProps, ICustomItemProviderProps, IItemProviderHookElementNonSearchOnly, usePropertiesMemoFor, IPropertiesMemoBase, IPropertiesMemoProperty } from "@onzag/itemize/client/providers/item/hook";
import React, { useMemo } from "react";
import type {PropertyDefinitionSupportedBooleanType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
import type {PropertyDefinitionSupportedIntegerType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/integer";
import type {PropertyDefinitionSupportedNumberType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/number";
import type {IPropertyDefinitionSupportedCurrencyType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import type {IPropertyDefinitionSupportedUnitType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";
import type {PropertyDefinitionSupportedStringType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/string";
import type {PropertyDefinitionSupportedPasswordType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/password";
import type {IPropertyDefinitionSupportedTextType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import type {PropertyDefinitionSupportedYearType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/year";
import type {PropertyDefinitionSupportedDateType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/date";
import type {PropertyDefinitionSupportedDateTimeType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/datetime";
import type {PropertyDefinitionSupportedTimeType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/time";
import type {IPropertyDefinitionSupportedLocationType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import type {PropertyDefinitionSupportedFileType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import type {PropertyDefinitionSupportedFilesType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import type {IPropertyDefinitionSupportedPaymentType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/payment";
import type {PropertyDefinitionSupportedTagListType} from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/taglist";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES, STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES } from "@onzag/itemize/constants";


const propertiesBaseModUsersIdefUser = ["username","app_language","app_country","app_currency","consent","phone","p_validated","p_notifications","email","e_validated","e_external","e_notifications","e_newsletter","password","role","profile_picture","address","about_me","session_id"] as const;
const allPropertiesModUsersIdefUser = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModUsersIdefUser as unknown as string[]);
interface IPropertiesMemoModUsersIdefUser extends IPropertiesMemoBase {
username: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
app_language: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
app_country: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
app_currency: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
consent: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
phone: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
p_validated: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
p_notifications: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
email: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
e_validated: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
e_external: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
e_notifications: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
e_newsletter: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
password: IPropertiesMemoProperty<PropertyDefinitionSupportedPasswordType>;
role: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
profile_picture: IPropertiesMemoProperty<PropertyDefinitionSupportedFileType>;
address: IPropertiesMemoProperty<IPropertyDefinitionSupportedLocationType>;
about_me: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>;
session_id: IPropertiesMemoProperty<PropertyDefinitionSupportedIntegerType>
};

type PropertiesForSettingModUsersIdefUser = {
username: {id: "username", value: PropertyDefinitionSupportedStringType, variant: never};
app_language: {id: "app_language", value: PropertyDefinitionSupportedStringType, variant: never};
app_country: {id: "app_country", value: PropertyDefinitionSupportedStringType, variant: never};
app_currency: {id: "app_currency", value: PropertyDefinitionSupportedStringType, variant: never};
consent: {id: "consent", value: PropertyDefinitionSupportedBooleanType, variant: never};
phone: {id: "phone", value: PropertyDefinitionSupportedStringType, variant: never};
p_validated: {id: "p_validated", value: PropertyDefinitionSupportedBooleanType, variant: never};
p_notifications: {id: "p_notifications", value: PropertyDefinitionSupportedBooleanType, variant: never};
email: {id: "email", value: PropertyDefinitionSupportedStringType, variant: never};
e_validated: {id: "e_validated", value: PropertyDefinitionSupportedBooleanType, variant: never};
e_external: {id: "e_external", value: PropertyDefinitionSupportedBooleanType, variant: never};
e_notifications: {id: "e_notifications", value: PropertyDefinitionSupportedBooleanType, variant: never};
e_newsletter: {id: "e_newsletter", value: PropertyDefinitionSupportedBooleanType, variant: never};
password: {id: "password", value: PropertyDefinitionSupportedPasswordType, variant: never};
role: {id: "role", value: PropertyDefinitionSupportedStringType, variant: never};
profile_picture: {id: "profile_picture", value: PropertyDefinitionSupportedFileType, variant: never};
address: {id: "address", value: IPropertyDefinitionSupportedLocationType, variant: never};
about_me: {id: "about_me", value: IPropertyDefinitionSupportedTextType, variant: never};
session_id: {id: "session_id", value: PropertyDefinitionSupportedIntegerType, variant: never}
};


const propertiesBaseModUsersModSEARCH_MODE_UsersIdefUser = ["SEARCH_username","IN_username","SEARCH_role","IN_role","search","created_by","since","until"] as const;
const allPropertiesModUsersModSEARCH_MODE_UsersIdefUser = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModUsersModSEARCH_MODE_UsersIdefUser as unknown as string[]);
interface IPropertiesMemoModUsersModSEARCH_MODE_UsersIdefUser extends IPropertiesMemoBase {
SEARCH_username: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_username: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
SEARCH_role: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_role: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
search: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
since: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>;
until: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>
};

type PropertiesForSettingModUsersModSEARCH_MODE_UsersIdefUser = {
SEARCH_username: {id: "username", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_username: {id: "username", value: PropertyDefinitionSupportedTagListType, variant: "in"};
SEARCH_role: {id: "role", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_role: {id: "role", value: PropertyDefinitionSupportedTagListType, variant: "in"};
search: {id: "search", value: PropertyDefinitionSupportedStringType, variant: never};
created_by: {id: "created_by", value: PropertyDefinitionSupportedStringType, variant: never};
since: {id: "since", value: PropertyDefinitionSupportedDateTimeType, variant: never};
until: {id: "until", value: PropertyDefinitionSupportedDateTimeType, variant: never}
};

export interface ItemProviderForModUsersIdefUser extends IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModUsersIdefUser[number]> {properties: IPropertiesMemoModUsersIdefUser};
export function useModUsersIdefUserItemProvider(options: ICustomItemProviderOptions<typeof propertiesBaseModUsersIdefUser[number], PropertiesForSettingModUsersIdefUser> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_users__IDEF_user",
    module: "MOD_users",
    searchCounterpart: false,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModUsersIdefUser>(allPropertiesModUsersIdefUser, provider);

  return ({
    ...(provider as IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModUsersIdefUser[number]>),
    properties,
  }) as ItemProviderForModUsersIdefUser;
};
export function ModUsersIdefUserItemProvider(props: ICustomItemProviderProps<typeof propertiesBaseModUsersIdefUser[number], PropertiesForSettingModUsersIdefUser> = {}) {

  return (<ItemProvider itemDefinition="MOD_users__IDEF_user" searchCounterpart={false} {...props}/>);
};
export interface ItemProviderForModUsersModSEARCH_MODE_UsersIdefUser extends IItemProviderHookElementSearchOnly<typeof propertiesBaseModUsersModSEARCH_MODE_UsersIdefUser[number],ModUsersIdefUserClientSideRqType,ModUsersIdefUserFlatRqType> {properties: IPropertiesMemoModUsersModSEARCH_MODE_UsersIdefUser};
export function useModUsersIdefUserSearchItemProvider(options: ICustomItemProviderSearchOptions<typeof propertiesBaseModUsersIdefUser[number], PropertiesForSettingModUsersModSEARCH_MODE_UsersIdefUser> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_users__IDEF_user",
    module: "MOD_users",
    searchCounterpart: true,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModUsersModSEARCH_MODE_UsersIdefUser>(allPropertiesModUsersModSEARCH_MODE_UsersIdefUser, provider);

  return ({
    ...(provider as IItemProviderHookElementSearchOnly<typeof propertiesBaseModUsersModSEARCH_MODE_UsersIdefUser[number],ModUsersIdefUserClientSideRqType,ModUsersIdefUserFlatRqType>),
    properties,
  }) as ItemProviderForModUsersModSEARCH_MODE_UsersIdefUser;
};
export function ModUsersIdefUserSearchItemProvider(props: ICustomItemProviderSearchProps<typeof propertiesBaseModUsersIdefUser[number], PropertiesForSettingModUsersModSEARCH_MODE_UsersIdefUser> = {}) {

  return (<ItemProvider itemDefinition="MOD_users__IDEF_user" searchCounterpart={true} {...props}/>);
};

const propertiesBaseModFlagIdefFlag = ["reason","status","reason_text"] as const;
const allPropertiesModFlagIdefFlag = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModFlagIdefFlag as unknown as string[]);
interface IPropertiesMemoModFlagIdefFlag extends IPropertiesMemoBase {
reason: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
status: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
reason_text: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>
};

type PropertiesForSettingModFlagIdefFlag = {
reason: {id: "reason", value: PropertyDefinitionSupportedStringType, variant: never};
status: {id: "status", value: PropertyDefinitionSupportedStringType, variant: never};
reason_text: {id: "reason_text", value: IPropertyDefinitionSupportedTextType, variant: never}
};


const propertiesBaseModFlagModSEARCH_MODE_FlagIdefFlag = ["SEARCH_reason","IN_reason","SEARCH_status","IN_status","search","created_by","since","until"] as const;
const allPropertiesModFlagModSEARCH_MODE_FlagIdefFlag = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModFlagModSEARCH_MODE_FlagIdefFlag as unknown as string[]);
interface IPropertiesMemoModFlagModSEARCH_MODE_FlagIdefFlag extends IPropertiesMemoBase {
SEARCH_reason: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_reason: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
SEARCH_status: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_status: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
search: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
since: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>;
until: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>
};

type PropertiesForSettingModFlagModSEARCH_MODE_FlagIdefFlag = {
SEARCH_reason: {id: "reason", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_reason: {id: "reason", value: PropertyDefinitionSupportedTagListType, variant: "in"};
SEARCH_status: {id: "status", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_status: {id: "status", value: PropertyDefinitionSupportedTagListType, variant: "in"};
search: {id: "search", value: PropertyDefinitionSupportedStringType, variant: never};
created_by: {id: "created_by", value: PropertyDefinitionSupportedStringType, variant: never};
since: {id: "since", value: PropertyDefinitionSupportedDateTimeType, variant: never};
until: {id: "until", value: PropertyDefinitionSupportedDateTimeType, variant: never}
};

export interface ItemProviderForModFlagIdefFlag extends IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModFlagIdefFlag[number]> {properties: IPropertiesMemoModFlagIdefFlag};
export function useModFlagIdefFlagItemProvider(options: ICustomItemProviderOptions<typeof propertiesBaseModFlagIdefFlag[number], PropertiesForSettingModFlagIdefFlag> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_flag__IDEF_flag",
    module: "MOD_flag",
    searchCounterpart: false,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModFlagIdefFlag>(allPropertiesModFlagIdefFlag, provider);

  return ({
    ...(provider as IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModFlagIdefFlag[number]>),
    properties,
  }) as ItemProviderForModFlagIdefFlag;
};
export function ModFlagIdefFlagItemProvider(props: ICustomItemProviderProps<typeof propertiesBaseModFlagIdefFlag[number], PropertiesForSettingModFlagIdefFlag> = {}) {

  return (<ItemProvider itemDefinition="MOD_flag__IDEF_flag" searchCounterpart={false} {...props}/>);
};
export interface ItemProviderForModFlagModSEARCH_MODE_FlagIdefFlag extends IItemProviderHookElementSearchOnly<typeof propertiesBaseModFlagModSEARCH_MODE_FlagIdefFlag[number],ModFlagIdefFlagClientSideRqType,ModFlagIdefFlagFlatRqType> {properties: IPropertiesMemoModFlagModSEARCH_MODE_FlagIdefFlag};
export function useModFlagIdefFlagSearchItemProvider(options: ICustomItemProviderSearchOptions<typeof propertiesBaseModFlagIdefFlag[number], PropertiesForSettingModFlagModSEARCH_MODE_FlagIdefFlag> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_flag__IDEF_flag",
    module: "MOD_flag",
    searchCounterpart: true,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModFlagModSEARCH_MODE_FlagIdefFlag>(allPropertiesModFlagModSEARCH_MODE_FlagIdefFlag, provider);

  return ({
    ...(provider as IItemProviderHookElementSearchOnly<typeof propertiesBaseModFlagModSEARCH_MODE_FlagIdefFlag[number],ModFlagIdefFlagClientSideRqType,ModFlagIdefFlagFlatRqType>),
    properties,
  }) as ItemProviderForModFlagModSEARCH_MODE_FlagIdefFlag;
};
export function ModFlagIdefFlagSearchItemProvider(props: ICustomItemProviderSearchProps<typeof propertiesBaseModFlagIdefFlag[number], PropertiesForSettingModFlagModSEARCH_MODE_FlagIdefFlag> = {}) {

  return (<ItemProvider itemDefinition="MOD_flag__IDEF_flag" searchCounterpart={true} {...props}/>);
};

const propertiesBaseModCmsIdefCms_PROPEXT_IDEF = ["content","attachments"] as const;

type PropertiesForSettingModCmsIdefCms_PROPEXT_IDEF = {
content: {id: "content", value: IPropertyDefinitionSupportedTextType, variant: never};
attachments: {id: "attachments", value: PropertyDefinitionSupportedFilesType, variant: never}
};


const propertiesBaseModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF = ["SEARCH_content"] as const;
const allPropertiesModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF as unknown as string[]);
interface IPropertiesMemoModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF extends IPropertiesMemoBase {
SEARCH_content: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>
};

type PropertiesForSettingModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF = {
SEARCH_content: {id: "content", value: PropertyDefinitionSupportedStringType, variant: "search"}
};

export interface ItemProviderForModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF extends IItemProviderHookElementSearchOnly<typeof propertiesBaseModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF[number],ModCmsClientSideRqType,ModCmsFlatRqType> {properties: IPropertiesMemoModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF};
export function useModCmsSearchItemProvider(options: ICustomItemProviderSearchOptions<typeof propertiesBaseModCmsIdefCms_PROPEXT_IDEF[number], PropertiesForSettingModCmsIdefCms_PROPEXT_IDEF> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: null,
    module: "MOD_cms",
    searchCounterpart: true,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF>(allPropertiesModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF, provider);

  return ({
    ...(provider as IItemProviderHookElementSearchOnly<typeof propertiesBaseModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF[number],ModCmsClientSideRqType,ModCmsFlatRqType>),
    properties,
  }) as ItemProviderForModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF;
};
export function ModCmsSearchItemProvider(props: ICustomItemProviderSearchProps<typeof propertiesBaseModCmsIdefCms_PROPEXT_IDEF[number], PropertiesForSettingModCmsModSEARCH_MODE_CmsIdefSEARCH_MODE_Cms_PROPEXT_IDEF> = {}) {

  return (<ModuleProvider module="MOD_cms"><ItemProvider searchCounterpart={true} {...props}/></ModuleProvider>);
};

const propertiesBaseModCmsIdefFragment = ["content","attachments"] as const;
const allPropertiesModCmsIdefFragment = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModCmsIdefFragment as unknown as string[]);
interface IPropertiesMemoModCmsIdefFragment extends IPropertiesMemoBase {
content: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>;
attachments: IPropertiesMemoProperty<PropertyDefinitionSupportedFilesType>
};

type PropertiesForSettingModCmsIdefFragment = {
content: {id: "content", value: IPropertyDefinitionSupportedTextType, variant: never};
attachments: {id: "attachments", value: PropertyDefinitionSupportedFilesType, variant: never}
};

export interface ItemProviderForModCmsIdefFragment extends IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModCmsIdefFragment[number]> {properties: IPropertiesMemoModCmsIdefFragment};
export function useModCmsIdefFragmentItemProvider(options: ICustomItemProviderOptions<typeof propertiesBaseModCmsIdefFragment[number], PropertiesForSettingModCmsIdefFragment> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_cms__IDEF_fragment",
    module: "MOD_cms",
    searchCounterpart: false,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModCmsIdefFragment>(allPropertiesModCmsIdefFragment, provider);

  return ({
    ...(provider as IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModCmsIdefFragment[number]>),
    properties,
  }) as ItemProviderForModCmsIdefFragment;
};
export function ModCmsIdefFragmentItemProvider(props: ICustomItemProviderProps<typeof propertiesBaseModCmsIdefFragment[number], PropertiesForSettingModCmsIdefFragment> = {}) {

  return (<ItemProvider itemDefinition="MOD_cms__IDEF_fragment" searchCounterpart={false} {...props}/>);
};

const propertiesBaseModCmsIdefArticle = ["content","attachments","title","locale","summary","summary_image"] as const;
const allPropertiesModCmsIdefArticle = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModCmsIdefArticle as unknown as string[]);
interface IPropertiesMemoModCmsIdefArticle extends IPropertiesMemoBase {
content: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>;
attachments: IPropertiesMemoProperty<PropertyDefinitionSupportedFilesType>;
title: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>;
locale: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
summary: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>;
summary_image: IPropertiesMemoProperty<PropertyDefinitionSupportedFileType>
};

type PropertiesForSettingModCmsIdefArticle = {
content: {id: "content", value: IPropertyDefinitionSupportedTextType, variant: never};
attachments: {id: "attachments", value: PropertyDefinitionSupportedFilesType, variant: never};
title: {id: "title", value: IPropertyDefinitionSupportedTextType, variant: never};
locale: {id: "locale", value: PropertyDefinitionSupportedStringType, variant: never};
summary: {id: "summary", value: IPropertyDefinitionSupportedTextType, variant: never};
summary_image: {id: "summary_image", value: PropertyDefinitionSupportedFileType, variant: never}
};


const propertiesBaseModCmsModSEARCH_MODE_CmsIdefArticle = ["SEARCH_content","SEARCH_title","SEARCH_locale","IN_locale","search","created_by","since","until"] as const;
const allPropertiesModCmsModSEARCH_MODE_CmsIdefArticle = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModCmsModSEARCH_MODE_CmsIdefArticle as unknown as string[]);
interface IPropertiesMemoModCmsModSEARCH_MODE_CmsIdefArticle extends IPropertiesMemoBase {
SEARCH_content: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
SEARCH_title: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
SEARCH_locale: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_locale: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
search: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
since: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>;
until: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>
};

type PropertiesForSettingModCmsModSEARCH_MODE_CmsIdefArticle = {
SEARCH_content: {id: "content", value: PropertyDefinitionSupportedStringType, variant: "search"};
SEARCH_title: {id: "title", value: PropertyDefinitionSupportedStringType, variant: "search"};
SEARCH_locale: {id: "locale", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_locale: {id: "locale", value: PropertyDefinitionSupportedTagListType, variant: "in"};
search: {id: "search", value: PropertyDefinitionSupportedStringType, variant: never};
created_by: {id: "created_by", value: PropertyDefinitionSupportedStringType, variant: never};
since: {id: "since", value: PropertyDefinitionSupportedDateTimeType, variant: never};
until: {id: "until", value: PropertyDefinitionSupportedDateTimeType, variant: never}
};

export interface ItemProviderForModCmsIdefArticle extends IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModCmsIdefArticle[number]> {properties: IPropertiesMemoModCmsIdefArticle};
export function useModCmsIdefArticleItemProvider(options: ICustomItemProviderOptions<typeof propertiesBaseModCmsIdefArticle[number], PropertiesForSettingModCmsIdefArticle> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_cms__IDEF_article",
    module: "MOD_cms",
    searchCounterpart: false,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModCmsIdefArticle>(allPropertiesModCmsIdefArticle, provider);

  return ({
    ...(provider as IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModCmsIdefArticle[number]>),
    properties,
  }) as ItemProviderForModCmsIdefArticle;
};
export function ModCmsIdefArticleItemProvider(props: ICustomItemProviderProps<typeof propertiesBaseModCmsIdefArticle[number], PropertiesForSettingModCmsIdefArticle> = {}) {

  return (<ItemProvider itemDefinition="MOD_cms__IDEF_article" searchCounterpart={false} {...props}/>);
};
export interface ItemProviderForModCmsModSEARCH_MODE_CmsIdefArticle extends IItemProviderHookElementSearchOnly<typeof propertiesBaseModCmsModSEARCH_MODE_CmsIdefArticle[number],ModCmsIdefArticleClientSideRqType,ModCmsIdefArticleFlatRqType> {properties: IPropertiesMemoModCmsModSEARCH_MODE_CmsIdefArticle};
export function useModCmsIdefArticleSearchItemProvider(options: ICustomItemProviderSearchOptions<typeof propertiesBaseModCmsIdefArticle[number], PropertiesForSettingModCmsModSEARCH_MODE_CmsIdefArticle> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_cms__IDEF_article",
    module: "MOD_cms",
    searchCounterpart: true,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModCmsModSEARCH_MODE_CmsIdefArticle>(allPropertiesModCmsModSEARCH_MODE_CmsIdefArticle, provider);

  return ({
    ...(provider as IItemProviderHookElementSearchOnly<typeof propertiesBaseModCmsModSEARCH_MODE_CmsIdefArticle[number],ModCmsIdefArticleClientSideRqType,ModCmsIdefArticleFlatRqType>),
    properties,
  }) as ItemProviderForModCmsModSEARCH_MODE_CmsIdefArticle;
};
export function ModCmsIdefArticleSearchItemProvider(props: ICustomItemProviderSearchProps<typeof propertiesBaseModCmsIdefArticle[number], PropertiesForSettingModCmsModSEARCH_MODE_CmsIdefArticle> = {}) {

  return (<ItemProvider itemDefinition="MOD_cms__IDEF_article" searchCounterpart={true} {...props}/>);
};

const propertiesBaseModMailIdefMail = ["uuid","references","timestamp","target","source","is_sender","is_receiver","read","spam","subject","content","cid_attachments","attachments","tip","metadata"] as const;
const allPropertiesModMailIdefMail = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModMailIdefMail as unknown as string[]);
interface IPropertiesMemoModMailIdefMail extends IPropertiesMemoBase {
uuid: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
references: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
timestamp: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>;
target: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
source: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
is_sender: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
is_receiver: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
read: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
spam: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
subject: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>;
content: IPropertiesMemoProperty<IPropertyDefinitionSupportedTextType>;
cid_attachments: IPropertiesMemoProperty<PropertyDefinitionSupportedFilesType>;
attachments: IPropertiesMemoProperty<PropertyDefinitionSupportedFilesType>;
tip: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
metadata: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>
};

type PropertiesForSettingModMailIdefMail = {
uuid: {id: "uuid", value: PropertyDefinitionSupportedStringType, variant: never};
references: {id: "references", value: PropertyDefinitionSupportedTagListType, variant: never};
timestamp: {id: "timestamp", value: PropertyDefinitionSupportedDateTimeType, variant: never};
target: {id: "target", value: PropertyDefinitionSupportedTagListType, variant: never};
source: {id: "source", value: PropertyDefinitionSupportedStringType, variant: never};
is_sender: {id: "is_sender", value: PropertyDefinitionSupportedBooleanType, variant: never};
is_receiver: {id: "is_receiver", value: PropertyDefinitionSupportedBooleanType, variant: never};
read: {id: "read", value: PropertyDefinitionSupportedBooleanType, variant: never};
spam: {id: "spam", value: PropertyDefinitionSupportedBooleanType, variant: never};
subject: {id: "subject", value: IPropertyDefinitionSupportedTextType, variant: never};
content: {id: "content", value: IPropertyDefinitionSupportedTextType, variant: never};
cid_attachments: {id: "cid_attachments", value: PropertyDefinitionSupportedFilesType, variant: never};
attachments: {id: "attachments", value: PropertyDefinitionSupportedFilesType, variant: never};
tip: {id: "tip", value: PropertyDefinitionSupportedBooleanType, variant: never};
metadata: {id: "metadata", value: PropertyDefinitionSupportedStringType, variant: never}
};


const propertiesBaseModMailModSEARCH_MODE_MailIdefMail = ["SEARCH_uuid","IN_uuid","SEARCH_references","FROM_timestamp","TO_timestamp","SEARCH_target","SEARCH_source","IN_source","EXACT_is_sender","EXACT_is_receiver","EXACT_read","EXACT_spam","SEARCH_subject","SEARCH_content","EXACT_tip","SEARCH_metadata","IN_metadata","search","created_by","since","until"] as const;
const allPropertiesModMailModSEARCH_MODE_MailIdefMail = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBaseModMailModSEARCH_MODE_MailIdefMail as unknown as string[]);
interface IPropertiesMemoModMailModSEARCH_MODE_MailIdefMail extends IPropertiesMemoBase {
SEARCH_uuid: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_uuid: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
SEARCH_references: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
FROM_timestamp: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>;
TO_timestamp: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>;
SEARCH_target: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
SEARCH_source: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_source: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
EXACT_is_sender: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
EXACT_is_receiver: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
EXACT_read: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
EXACT_spam: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
SEARCH_subject: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
SEARCH_content: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
EXACT_tip: IPropertiesMemoProperty<PropertyDefinitionSupportedBooleanType>;
SEARCH_metadata: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
IN_metadata: IPropertiesMemoProperty<PropertyDefinitionSupportedTagListType>;
search: IPropertiesMemoProperty<PropertyDefinitionSupportedStringType>;
since: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>;
until: IPropertiesMemoProperty<PropertyDefinitionSupportedDateTimeType>
};

type PropertiesForSettingModMailModSEARCH_MODE_MailIdefMail = {
SEARCH_uuid: {id: "uuid", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_uuid: {id: "uuid", value: PropertyDefinitionSupportedTagListType, variant: "in"};
SEARCH_references: {id: "references", value: PropertyDefinitionSupportedTagListType, variant: "search"};
FROM_timestamp: {id: "timestamp", value: PropertyDefinitionSupportedDateTimeType, variant: "from"};
TO_timestamp: {id: "timestamp", value: PropertyDefinitionSupportedDateTimeType, variant: "to"};
SEARCH_target: {id: "target", value: PropertyDefinitionSupportedTagListType, variant: "search"};
SEARCH_source: {id: "source", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_source: {id: "source", value: PropertyDefinitionSupportedTagListType, variant: "in"};
EXACT_is_sender: {id: "is_sender", value: PropertyDefinitionSupportedBooleanType, variant: "exact"};
EXACT_is_receiver: {id: "is_receiver", value: PropertyDefinitionSupportedBooleanType, variant: "exact"};
EXACT_read: {id: "read", value: PropertyDefinitionSupportedBooleanType, variant: "exact"};
EXACT_spam: {id: "spam", value: PropertyDefinitionSupportedBooleanType, variant: "exact"};
SEARCH_subject: {id: "subject", value: PropertyDefinitionSupportedStringType, variant: "search"};
SEARCH_content: {id: "content", value: PropertyDefinitionSupportedStringType, variant: "search"};
EXACT_tip: {id: "tip", value: PropertyDefinitionSupportedBooleanType, variant: "exact"};
SEARCH_metadata: {id: "metadata", value: PropertyDefinitionSupportedStringType, variant: "search"};
IN_metadata: {id: "metadata", value: PropertyDefinitionSupportedTagListType, variant: "in"};
search: {id: "search", value: PropertyDefinitionSupportedStringType, variant: never};
created_by: {id: "created_by", value: PropertyDefinitionSupportedStringType, variant: never};
since: {id: "since", value: PropertyDefinitionSupportedDateTimeType, variant: never};
until: {id: "until", value: PropertyDefinitionSupportedDateTimeType, variant: never}
};

export interface ItemProviderForModMailIdefMail extends IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModMailIdefMail[number]> {properties: IPropertiesMemoModMailIdefMail};
export function useModMailIdefMailItemProvider(options: ICustomItemProviderOptions<typeof propertiesBaseModMailIdefMail[number], PropertiesForSettingModMailIdefMail> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_mail__IDEF_mail",
    module: "MOD_mail",
    searchCounterpart: false,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModMailIdefMail>(allPropertiesModMailIdefMail, provider);

  return ({
    ...(provider as IItemProviderHookElementNonSearchOnly<typeof propertiesBaseModMailIdefMail[number]>),
    properties,
  }) as ItemProviderForModMailIdefMail;
};
export function ModMailIdefMailItemProvider(props: ICustomItemProviderProps<typeof propertiesBaseModMailIdefMail[number], PropertiesForSettingModMailIdefMail> = {}) {

  return (<ItemProvider itemDefinition="MOD_mail__IDEF_mail" searchCounterpart={false} {...props}/>);
};
export interface ItemProviderForModMailModSEARCH_MODE_MailIdefMail extends IItemProviderHookElementSearchOnly<typeof propertiesBaseModMailModSEARCH_MODE_MailIdefMail[number],ModMailIdefMailClientSideRqType,ModMailIdefMailFlatRqType> {properties: IPropertiesMemoModMailModSEARCH_MODE_MailIdefMail};
export function useModMailIdefMailSearchItemProvider(options: ICustomItemProviderSearchOptions<typeof propertiesBaseModMailIdefMail[number], PropertiesForSettingModMailModSEARCH_MODE_MailIdefMail> = {}) {

  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: "MOD_mail__IDEF_mail",
    module: "MOD_mail",
    searchCounterpart: true,
  });

  const properties = usePropertiesMemoFor<IPropertiesMemoModMailModSEARCH_MODE_MailIdefMail>(allPropertiesModMailModSEARCH_MODE_MailIdefMail, provider);

  return ({
    ...(provider as IItemProviderHookElementSearchOnly<typeof propertiesBaseModMailModSEARCH_MODE_MailIdefMail[number],ModMailIdefMailClientSideRqType,ModMailIdefMailFlatRqType>),
    properties,
  }) as ItemProviderForModMailModSEARCH_MODE_MailIdefMail;
};
export function ModMailIdefMailSearchItemProvider(props: ICustomItemProviderSearchProps<typeof propertiesBaseModMailIdefMail[number], PropertiesForSettingModMailModSEARCH_MODE_MailIdefMail> = {}) {

  return (<ItemProvider itemDefinition="MOD_mail__IDEF_mail" searchCounterpart={true} {...props}/>);
};
