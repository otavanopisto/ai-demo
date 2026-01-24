interface ModUsersFlatRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_users__IDEF_user");
	/**If exists, a parent id of this item*/
	parent_id?: string;
	/**If exists, the parent version of this item*/
	parent_version?: string;
	/**If exists, a parent type of this item*/
	parent_type?: string;
	/**When the item was created*/
	created_at?: string;
	/**The id of the user who created this item*/
	created_by?: string;
	/**Whenever the item was modified, otherwise null*/
	edited_at?: string;
	/**Whoever modified this item, otherwise null*/
	edited_by?: string;
	/**When a moderator or admin reviewed this item*/
	reviewed_at?: string;
	/**The user id who reviewed it*/
	reviewed_by?: string;

	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModUsersClientSideRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_users__IDEF_user");
	DATA?: {
		/**If exists, a parent id of this item*/
		parent_id?: string;
		/**If exists, the parent version of this item*/
		parent_version?: string;
		/**If exists, a parent type of this item*/
		parent_type?: string;
		/**When the item was created*/
		created_at?: string;
		/**The id of the user who created this item*/
		created_by?: string;
		/**Whenever the item was modified, otherwise null*/
		edited_at?: string;
		/**Whoever modified this item, otherwise null*/
		edited_by?: string;
		/**When a moderator or admin reviewed this item*/
		reviewed_at?: string;
		/**The user id who reviewed it*/
		reviewed_by?: string;
	};
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModUsersSQLType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_users__IDEF_user");
	parent_id?: string;
	parent_version?: string;
	parent_type?: string;
	created_at: string;
	created_by: string;
	edited_at?: string;
	edited_by?: string;
	reviewed_at?: string;
	reviewed_by?: string;
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModUsersIdefUserFlatRqType extends ModUsersFlatRqType {
	/**username - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	username: string;
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	app_language: string;
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	app_country: string;
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	app_currency: string;
	/**Help improve ai-demo by providing analytics and usage information to our staff - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: &ANYONE - */
	consent?: boolean;
	/**Your phone number will not be shared with anyone, it is kept private to all other users - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER, ADMIN - EDIT ACCESS: &OWNER, ADMIN - */
	phone?: string;
	/**Refers to whether the phone number is validated or not - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: ADMIN - */
	p_validated?: boolean;
	/**Receive important notifications via SMS - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
	p_notifications?: boolean;
	/**Your email will not be shared with anyone, it is kept private to all other users - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER, ADMIN - EDIT ACCESS: &OWNER, ADMIN - */
	email?: string;
	/**Refers to whether the email is validated or not - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: ADMIN - */
	e_validated?: boolean;
	/**Activates an external email at {0}@{1} - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
	e_external?: boolean;
	/**Do not miss content by recieving email notifications - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
	e_notifications?: boolean;
	/**Keep yourself updated with our amazing newsletter - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
	e_newsletter?: boolean;
	/**role - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: ADMIN - */
	role?: string;
	/**profile picture - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER, ADMIN - */
	profile_picture?: {
		id: string;
		metadata?: string;
		name: string;
		size: number;
		type: string;
		url: string;
		cluster?: string;
	};
	/**This address is used only for ease of use and it is not shared with anyone. It is used to prefill information for transactions. - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: &OWNER, ADMIN - */
	address?: {
		lng: number;
		lat: number;
		txt: string;
		atxt: string;
		id: string;
	};
	/**about me - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER, ADMIN - */
	about_me?: {
		value?: string;
		language?: string;
	};
}

interface ModUsersIdefUserClientSideRqType extends ModUsersClientSideRqType {
	DATA?: ModUsersClientSideRqType["DATA"] & {
		/**username - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		username: string;
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		app_language: string;
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		app_country: string;
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		app_currency: string;
		/**Help improve ai-demo by providing analytics and usage information to our staff - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: &ANYONE - */
		consent?: boolean;
		/**Your phone number will not be shared with anyone, it is kept private to all other users - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER, ADMIN - EDIT ACCESS: &OWNER, ADMIN - */
		phone?: string;
		/**Refers to whether the phone number is validated or not - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: ADMIN - */
		p_validated?: boolean;
		/**Receive important notifications via SMS - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
		p_notifications?: boolean;
		/**Your email will not be shared with anyone, it is kept private to all other users - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER, ADMIN - EDIT ACCESS: &OWNER, ADMIN - */
		email?: string;
		/**Refers to whether the email is validated or not - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: ADMIN - */
		e_validated?: boolean;
		/**Activates an external email at {0}@{1} - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
		e_external?: boolean;
		/**Do not miss content by recieving email notifications - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
		e_notifications?: boolean;
		/**Keep yourself updated with our amazing newsletter - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: ADMIN, &OWNER - */
		e_newsletter?: boolean;
		/**role - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: ADMIN - */
		role?: string;
		/**profile picture - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER, ADMIN - */
		profile_picture?: {
			id: string;
			metadata?: string;
			name: string;
			size: number;
			type: string;
			url: string;
			cluster?: string;
		};
		/**This address is used only for ease of use and it is not shared with anyone. It is used to prefill information for transactions. - CREATE ACCESS: &ANYONE - READ ACCESS: &OWNER - EDIT ACCESS: &OWNER, ADMIN - */
		address?: {
			lng: number;
			lat: number;
			txt: string;
			atxt: string;
			id: string;
		};
		/**about me - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER, ADMIN - */
		about_me?: {
			value?: string;
			language?: string;
		};
	};
}

interface ModUsersIdefOnlyUserSQLType {
	MODULE_ID: string;
	MODULE_VERSION: string;
	username?: string;
	app_language?: string;
	app_country?: string;
	app_currency?: string;
	consent?: boolean;
	phone?: string;
	p_validated?: boolean;
	p_notifications?: boolean;
	email?: string;
	e_validated?: boolean;
	e_external?: boolean;
	e_notifications?: boolean;
	e_newsletter?: boolean;
	password?: string;
	role?: string;
	profile_picture?: string;
	address_GEO?: any;
	address_ID?: string;
	address_LAT?: number;
	address_LNG?: number;
	address_TXT?: string;
	address_ATXT?: string;
	about_me?: string;
	about_me_PLAIN?: string;
	about_me_DICTIONARY?: any;
	about_me_LANGUAGE?: string;
	about_me_VECTOR?: string;
	session_id?: number;
}

interface ModUsersIdefUserSQLType extends ModUsersSQLType, ModUsersIdefOnlyUserSQLType {};

interface ModFlagFlatRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_flag__IDEF_flag");
	/**If exists, a parent id of this item*/
	parent_id?: string;
	/**If exists, the parent version of this item*/
	parent_version?: string;
	/**If exists, a parent type of this item*/
	parent_type?: string;
	/**When the item was created*/
	created_at?: string;
	/**The id of the user who created this item*/
	created_by?: string;
	/**Whenever the item was modified, otherwise null*/
	edited_at?: string;
	/**Whoever modified this item, otherwise null*/
	edited_by?: string;
	/**When a moderator or admin reviewed this item*/
	reviewed_at?: string;
	/**The user id who reviewed it*/
	reviewed_by?: string;

	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModFlagClientSideRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_flag__IDEF_flag");
	DATA?: {
		/**If exists, a parent id of this item*/
		parent_id?: string;
		/**If exists, the parent version of this item*/
		parent_version?: string;
		/**If exists, a parent type of this item*/
		parent_type?: string;
		/**When the item was created*/
		created_at?: string;
		/**The id of the user who created this item*/
		created_by?: string;
		/**Whenever the item was modified, otherwise null*/
		edited_at?: string;
		/**Whoever modified this item, otherwise null*/
		edited_by?: string;
		/**When a moderator or admin reviewed this item*/
		reviewed_at?: string;
		/**The user id who reviewed it*/
		reviewed_by?: string;
	};
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModFlagSQLType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_flag__IDEF_flag");
	parent_id?: string;
	parent_version?: string;
	parent_type?: string;
	created_at: string;
	created_by: string;
	edited_at?: string;
	edited_by?: string;
	reviewed_at?: string;
	reviewed_by?: string;
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModFlagIdefFlagFlatRqType extends ModFlagFlatRqType {
	/**reason - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	reason: string;
	/**status - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	status?: string;
	/**additional information - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	reason_text?: {
		value?: string;
		language?: string;
	};
}

interface ModFlagIdefFlagClientSideRqType extends ModFlagClientSideRqType {
	DATA?: ModFlagClientSideRqType["DATA"] & {
		/**reason - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		reason: string;
		/**status - CREATE ACCESS: ADMIN - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		status?: string;
		/**additional information - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		reason_text?: {
			value?: string;
			language?: string;
		};
	};
}

interface ModFlagIdefOnlyFlagSQLType {
	MODULE_ID: string;
	MODULE_VERSION: string;
	reason?: string;
	status?: string;
	reason_text?: string;
	reason_text_PLAIN?: string;
	reason_text_DICTIONARY?: any;
	reason_text_LANGUAGE?: string;
	reason_text_VECTOR?: string;
}

interface ModFlagIdefFlagSQLType extends ModFlagSQLType, ModFlagIdefOnlyFlagSQLType {};

interface ModCmsFlatRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_cms__IDEF_fragment" | "MOD_cms__IDEF_article");
	/**If exists, a parent id of this item*/
	parent_id?: string;
	/**If exists, the parent version of this item*/
	parent_version?: string;
	/**If exists, a parent type of this item*/
	parent_type?: string;
	/**When the item was created*/
	created_at?: string;
	/**The id of the user who created this item*/
	created_by?: string;
	/**Whenever the item was modified, otherwise null*/
	edited_at?: string;
	/**Whoever modified this item, otherwise null*/
	edited_by?: string;
	/**When a moderator or admin reviewed this item*/
	reviewed_at?: string;
	/**The user id who reviewed it*/
	reviewed_by?: string;
	/**content - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	content: {
		value?: string;
		language?: string;
	};
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	attachments?: {
		id: string;
		metadata?: string;
		name: string;
		size: number;
		type: string;
		url: string;
		cluster?: string;
	}[];

	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModCmsClientSideRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_cms__IDEF_fragment" | "MOD_cms__IDEF_article");
	DATA?: {
		/**If exists, a parent id of this item*/
		parent_id?: string;
		/**If exists, the parent version of this item*/
		parent_version?: string;
		/**If exists, a parent type of this item*/
		parent_type?: string;
		/**When the item was created*/
		created_at?: string;
		/**The id of the user who created this item*/
		created_by?: string;
		/**Whenever the item was modified, otherwise null*/
		edited_at?: string;
		/**Whoever modified this item, otherwise null*/
		edited_by?: string;
		/**When a moderator or admin reviewed this item*/
		reviewed_at?: string;
		/**The user id who reviewed it*/
		reviewed_by?: string;
		/**content - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		content: {
			value?: string;
			language?: string;
		};
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		attachments?: {
			id: string;
			metadata?: string;
			name: string;
			size: number;
			type: string;
			url: string;
			cluster?: string;
		}[];
	};
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModCmsSQLType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_cms__IDEF_fragment" | "MOD_cms__IDEF_article");
	parent_id?: string;
	parent_version?: string;
	parent_type?: string;
	created_at: string;
	created_by: string;
	edited_at?: string;
	edited_by?: string;
	reviewed_at?: string;
	reviewed_by?: string;
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
	content?: string;
	content_PLAIN?: string;
	content_DICTIONARY?: any;
	content_LANGUAGE?: string;
	content_VECTOR?: string;
	attachments?: string;
}

interface ModCmsIdefFragmentFlatRqType extends ModCmsFlatRqType {
}

interface ModCmsIdefFragmentClientSideRqType extends ModCmsClientSideRqType {
}

interface ModCmsIdefOnlyFragmentSQLType {
	MODULE_ID: string;
	MODULE_VERSION: string;
}

interface ModCmsIdefFragmentSQLType extends ModCmsSQLType, ModCmsIdefOnlyFragmentSQLType {};

interface ModCmsIdefArticleFlatRqType extends ModCmsFlatRqType {
	/**title - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	title: {
		value?: string;
		language?: string;
	};
	/**The locale is either a language, eg. en, a country code eg. US or a combination en-US - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	locale: string;
	/**summary - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	summary: {
		value?: string;
		language?: string;
	};
	/**summary image - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	summary_image?: {
		id: string;
		metadata?: string;
		name: string;
		size: number;
		type: string;
		url: string;
		cluster?: string;
	};
}

interface ModCmsIdefArticleClientSideRqType extends ModCmsClientSideRqType {
	DATA?: ModCmsClientSideRqType["DATA"] & {
		/**title - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		title: {
			value?: string;
			language?: string;
		};
		/**The locale is either a language, eg. en, a country code eg. US or a combination en-US - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		locale: string;
		/**summary - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		summary: {
			value?: string;
			language?: string;
		};
		/**summary image - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		summary_image?: {
			id: string;
			metadata?: string;
			name: string;
			size: number;
			type: string;
			url: string;
			cluster?: string;
		};
	};
}

interface ModCmsIdefOnlyArticleSQLType {
	MODULE_ID: string;
	MODULE_VERSION: string;
	title?: string;
	title_PLAIN?: string;
	title_DICTIONARY?: any;
	title_LANGUAGE?: string;
	title_VECTOR?: string;
	locale?: string;
	summary?: string;
	summary_PLAIN?: string;
	summary_DICTIONARY?: any;
	summary_LANGUAGE?: string;
	summary_VECTOR?: string;
	summary_image?: string;
}

interface ModCmsIdefArticleSQLType extends ModCmsSQLType, ModCmsIdefOnlyArticleSQLType {};

interface ModMailFlatRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_mail__IDEF_mail");
	/**If exists, a parent id of this item*/
	parent_id?: string;
	/**If exists, the parent version of this item*/
	parent_version?: string;
	/**If exists, a parent type of this item*/
	parent_type?: string;
	/**When the item was created*/
	created_at?: string;
	/**The id of the user who created this item*/
	created_by?: string;
	/**Whenever the item was modified, otherwise null*/
	edited_at?: string;
	/**Whoever modified this item, otherwise null*/
	edited_by?: string;
	/**When a moderator or admin reviewed this item*/
	reviewed_at?: string;
	/**The user id who reviewed it*/
	reviewed_by?: string;

	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModMailClientSideRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_mail__IDEF_mail");
	DATA?: {
		/**If exists, a parent id of this item*/
		parent_id?: string;
		/**If exists, the parent version of this item*/
		parent_version?: string;
		/**If exists, a parent type of this item*/
		parent_type?: string;
		/**When the item was created*/
		created_at?: string;
		/**The id of the user who created this item*/
		created_by?: string;
		/**Whenever the item was modified, otherwise null*/
		edited_at?: string;
		/**Whoever modified this item, otherwise null*/
		edited_by?: string;
		/**When a moderator or admin reviewed this item*/
		reviewed_at?: string;
		/**The user id who reviewed it*/
		reviewed_by?: string;
	};
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModMailSQLType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_mail__IDEF_mail");
	parent_id?: string;
	parent_version?: string;
	parent_type?: string;
	created_at: string;
	created_by: string;
	edited_at?: string;
	edited_by?: string;
	reviewed_at?: string;
	reviewed_by?: string;
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModMailIdefMailFlatRqType extends ModMailFlatRqType {
	/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	uuid?: string;
	/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	references?: string[];
	/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	timestamp?: string;
	/**recepients - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	target: string[];
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	source: string;
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	is_sender: boolean;
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	is_receiver: boolean;
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER - */
	read: boolean;
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER - */
	spam: boolean;
	/**subject - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	subject?: {
		value?: string;
		language?: string;
	};
	/**content - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	content?: {
		value?: string;
		language?: string;
	};
	/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	cid_attachments?: {
		id: string;
		metadata?: string;
		name: string;
		size: number;
		type: string;
		url: string;
		cluster?: string;
	}[];
	/**attachments - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	attachments?: {
		id: string;
		metadata?: string;
		name: string;
		size: number;
		type: string;
		url: string;
		cluster?: string;
	}[];
	/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
	tip?: boolean;
	/**no description supplied - CREATE ACCESS:  - READ ACCESS:  - EDIT ACCESS:  - */
	metadata?: string;
}

interface ModMailIdefMailClientSideRqType extends ModMailClientSideRqType {
	DATA?: ModMailClientSideRqType["DATA"] & {
		/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		uuid?: string;
		/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		references?: string[];
		/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		timestamp?: string;
		/**recepients - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		target: string[];
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		source: string;
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		is_sender: boolean;
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		is_receiver: boolean;
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER - */
		read: boolean;
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &OWNER - */
		spam: boolean;
		/**subject - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		subject?: {
			value?: string;
			language?: string;
		};
		/**content - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		content?: {
			value?: string;
			language?: string;
		};
		/**no description supplied - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		cid_attachments?: {
			id: string;
			metadata?: string;
			name: string;
			size: number;
			type: string;
			url: string;
			cluster?: string;
		}[];
		/**attachments - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		attachments?: {
			id: string;
			metadata?: string;
			name: string;
			size: number;
			type: string;
			url: string;
			cluster?: string;
		}[];
		/**no description supplied - CREATE ACCESS:  - READ ACCESS: &ANYONE - EDIT ACCESS:  - */
		tip?: boolean;
		/**no description supplied - CREATE ACCESS:  - READ ACCESS:  - EDIT ACCESS:  - */
		metadata?: string;
	};
}

interface ModMailIdefOnlyMailSQLType {
	MODULE_ID: string;
	MODULE_VERSION: string;
	uuid?: string;
	references?: string[];
	timestamp?: string;
	target?: string[];
	source?: string;
	is_sender?: boolean;
	is_receiver?: boolean;
	read?: boolean;
	spam?: boolean;
	subject?: string;
	subject_PLAIN?: string;
	subject_DICTIONARY?: any;
	subject_LANGUAGE?: string;
	subject_VECTOR?: string;
	content?: string;
	content_PLAIN?: string;
	content_DICTIONARY?: any;
	content_LANGUAGE?: string;
	content_VECTOR?: string;
	cid_attachments?: string;
	attachments?: string;
	tip?: boolean;
	metadata?: any;
}

interface ModMailIdefMailSQLType extends ModMailSQLType, ModMailIdefOnlyMailSQLType {};

interface ModAiFlatRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_ai__IDEF_agent");
	/**If exists, a parent id of this item*/
	parent_id?: string;
	/**If exists, the parent version of this item*/
	parent_version?: string;
	/**If exists, a parent type of this item*/
	parent_type?: string;
	/**When the item was created*/
	created_at?: string;
	/**The id of the user who created this item*/
	created_by?: string;
	/**Whenever the item was modified, otherwise null*/
	edited_at?: string;
	/**Whoever modified this item, otherwise null*/
	edited_by?: string;
	/**When a moderator or admin reviewed this item*/
	reviewed_at?: string;
	/**The user id who reviewed it*/
	reviewed_by?: string;

	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModAiClientSideRqType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_ai__IDEF_agent");
	DATA?: {
		/**If exists, a parent id of this item*/
		parent_id?: string;
		/**If exists, the parent version of this item*/
		parent_version?: string;
		/**If exists, a parent type of this item*/
		parent_type?: string;
		/**When the item was created*/
		created_at?: string;
		/**The id of the user who created this item*/
		created_by?: string;
		/**Whenever the item was modified, otherwise null*/
		edited_at?: string;
		/**Whoever modified this item, otherwise null*/
		edited_by?: string;
		/**When a moderator or admin reviewed this item*/
		reviewed_at?: string;
		/**The user id who reviewed it*/
		reviewed_by?: string;
	};
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModAiSQLType {
	/**The id of the item*/
	id: string;
	/**An optional version of the item, the item must have versioning enabled*/
	version?: string;
	/**The type (qualified name) of the item*/
	type: ("MOD_ai__IDEF_agent");
	parent_id?: string;
	parent_version?: string;
	parent_type?: string;
	created_at: string;
	created_by: string;
	edited_at?: string;
	edited_by?: string;
	reviewed_at?: string;
	reviewed_by?: string;
	/**An internal variable that represents when the whole item, as a whole  was last modified, by any factor, edited_at servers a UI purpose when things were  modified by normal means whereas last_modified is a global factor, it could be the  server that did the change, or a side effect, edited_at can be used in the UI  last modified is for usage which checking if items updated*/
	last_modified?: string;
	/**When the item was blocked, blocked items are not searchable or retrievable by normal means; if you as an user own this item, you will only see it blocked, unlike deleted items, blocked items remain in the database until they are manually removed by an admin or moderator, none can access the data of this item, the API will null all the fields, with the exception of blocked_at, blocked_by, blocked_until and blocked_reason*/
	blocked_at?: string;
	/**Basically makes the block be temporary and will be automatically lifted by the database*/
	blocked_until?: string;
	/**By whom it was blocked*/
	blocked_by?: string;
	/**A written text of why it was blocked*/
	blocked_reason?: string;
}

interface ModAiIdefAgentFlatRqType extends ModAiFlatRqType {
	/**Agent name - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	name: {
		value?: string;
		language?: string;
	};
	/**Agent description - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	description: {
		value?: string;
		language?: string;
	};
	/**Agent behaviour - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	behaviour: {
		value?: string;
		language?: string;
	};
	/**Agent expertise - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
	expertise: {
		value?: string;
		language?: string;
	};
}

interface ModAiIdefAgentClientSideRqType extends ModAiClientSideRqType {
	DATA?: ModAiClientSideRqType["DATA"] & {
		/**Agent name - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		name: {
			value?: string;
			language?: string;
		};
		/**Agent description - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		description: {
			value?: string;
			language?: string;
		};
		/**Agent behaviour - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		behaviour: {
			value?: string;
			language?: string;
		};
		/**Agent expertise - CREATE ACCESS: &ANYONE - READ ACCESS: &ANYONE - EDIT ACCESS: &ANYONE - */
		expertise: {
			value?: string;
			language?: string;
		};
	};
}

interface ModAiIdefOnlyAgentSQLType {
	MODULE_ID: string;
	MODULE_VERSION: string;
	name?: string;
	name_PLAIN?: string;
	name_DICTIONARY?: any;
	name_LANGUAGE?: string;
	name_VECTOR?: string;
	description?: string;
	description_PLAIN?: string;
	description_DICTIONARY?: any;
	description_LANGUAGE?: string;
	description_VECTOR?: string;
	behaviour?: string;
	behaviour_PLAIN?: string;
	behaviour_DICTIONARY?: any;
	behaviour_LANGUAGE?: string;
	behaviour_VECTOR?: string;
	expertise?: string;
	expertise_PLAIN?: string;
	expertise_DICTIONARY?: any;
	expertise_LANGUAGE?: string;
	expertise_VECTOR?: string;
}

interface ModAiIdefAgentSQLType extends ModAiSQLType, ModAiIdefOnlyAgentSQLType {};

