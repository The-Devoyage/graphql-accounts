import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@the-devoyage/micro-auth-helpers';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: string;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: string;
  _Any: any;
  federation__FieldSet: any;
  link__Import: any;
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ObjectID'];
  activation?: Maybe<Activation>;
  createdAt: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  password?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type AccountFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  activation?: InputMaybe<GetAccountsActivationInput>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  email?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type Activation = {
  __typename?: 'Activation';
  code?: Maybe<Scalars['String']>;
  limit: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

/** Filter for documents which have a property that is a Boolean. */
export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

/** Equal or Not Equal */
export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

/** Filter for documents which have a property that is a Date. */
export type DateFieldFilter = {
  date: Scalars['DateTime'];
  filterBy: DateFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum DateFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

/** Global configuration details. */
export type FilterConfig = {
  history?: InputMaybe<HistoryFilterInput>;
  pagination?: InputMaybe<Pagination>;
};

export type GetAccountsActivationInput = {
  verified: Array<BooleanFieldFilter>;
};

export type GetAccountsInput = {
  config?: InputMaybe<FilterConfig>;
  query: AccountFieldFiltersInput;
};

export type GetAccountsResponse = {
  __typename?: 'GetAccountsResponse';
  data: Array<Account>;
  stats: Stats;
};

export type HistoricStats = {
  __typename?: 'HistoricStats';
  _id?: Maybe<HistoricStatsId>;
  total?: Maybe<Scalars['Int']>;
};

export type HistoricStatsId = {
  __typename?: 'HistoricStatsId';
  DAY_OF_MONTH?: Maybe<Scalars['Int']>;
  DAY_OF_WEEK?: Maybe<Scalars['Int']>;
  DAY_OF_YEAR?: Maybe<Scalars['Int']>;
  HOUR?: Maybe<Scalars['Int']>;
  MILLISECONDS?: Maybe<Scalars['Int']>;
  MINUTES?: Maybe<Scalars['Int']>;
  MONTH?: Maybe<Scalars['Int']>;
  SECONDS?: Maybe<Scalars['Int']>;
  WEEK?: Maybe<Scalars['Int']>;
  YEAR?: Maybe<Scalars['Int']>;
};

export type HistoryFilterInput = {
  interval: Array<HistoryFilterIntervalEnum>;
};

export enum HistoryFilterIntervalEnum {
  DayOfMonth = 'DAY_OF_MONTH',
  DayOfWeek = 'DAY_OF_WEEK',
  DayOfYear = 'DAY_OF_YEAR',
  Hour = 'HOUR',
  Milliseconds = 'MILLISECONDS',
  Minutes = 'MINUTES',
  Month = 'MONTH',
  Seconds = 'SECONDS',
  Week = 'WEEK',
  Year = 'YEAR'
}

/** Filter for documents which have a property that is an Integer. */
export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  int: Scalars['Int'];
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type LoginAccountResponse = {
  __typename?: 'LoginAccountResponse';
  account: Account;
  token: Scalars['JWT'];
};

export type LoginInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginAccountResponse;
  register: Account;
  resetActivationCode: Account;
  resetPassword: Account;
  updateEmail: Account;
  verifyEmail: Account;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationResetActivationCodeArgs = {
  resetCodeInput: ResetCodeInput;
};


export type MutationResetPasswordArgs = {
  resetInput: ResetPasswordInput;
};


export type MutationUpdateEmailArgs = {
  updateEmailInput: UpdateEmailInput;
};


export type MutationVerifyEmailArgs = {
  verifyEmailInput: VerifyEmailInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getAccounts: GetAccountsResponse;
  getMyAccount: Account;
  isAuthenticated: Scalars['Boolean'];
};


export type QueryGetAccountsArgs = {
  getAccountsInput: GetAccountsInput;
};

export type RegisterInput = {
  email: Scalars['EmailAddress'];
  password?: InputMaybe<Scalars['String']>;
};

export type ResetCodeInput = {
  email: Scalars['EmailAddress'];
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  history?: Maybe<Array<HistoricStats>>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** Filter for documents which have a property that is an array of strings.. */
export type StringArrayFieldFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Array<Scalars['String']>;
};

/** Filter for documents which have a property that is a string. Filter by REGEX, ObjectID, or Match. */
export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type UpdateEmailInput = {
  account: Scalars['ObjectID'];
  email: Scalars['EmailAddress'];
};

export type VerifyEmailInput = {
  code: Scalars['String'];
  email: Scalars['EmailAddress'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  message: Scalars['String'];
};

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  AccountFieldFiltersInput: AccountFieldFiltersInput;
  Activation: ResolverTypeWrapper<Activation>;
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  DateFieldFilter: DateFieldFilter;
  DateFilterByEnum: DateFilterByEnum;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  FilterConfig: FilterConfig;
  GetAccountsActivationInput: GetAccountsActivationInput;
  GetAccountsInput: GetAccountsInput;
  GetAccountsResponse: ResolverTypeWrapper<GetAccountsResponse>;
  HistoricStats: ResolverTypeWrapper<HistoricStats>;
  HistoricStatsId: ResolverTypeWrapper<HistoricStatsId>;
  HistoryFilterInput: HistoryFilterInput;
  HistoryFilterIntervalEnum: HistoryFilterIntervalEnum;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  LoginAccountResponse: ResolverTypeWrapper<LoginAccountResponse>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OperatorFieldConfigEnum: OperatorFieldConfigEnum;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  ResetCodeInput: ResetCodeInput;
  ResetPasswordInput: ResetPasswordInput;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  UpdateEmailInput: UpdateEmailInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailResponse: ResolverTypeWrapper<VerifyEmailResponse>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['Account'];
  _Service: ResolverTypeWrapper<_Service>;
  federation__FieldSet: ResolverTypeWrapper<Scalars['federation__FieldSet']>;
  link__Import: ResolverTypeWrapper<Scalars['link__Import']>;
  link__Purpose: Link__Purpose;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  AccountFieldFiltersInput: AccountFieldFiltersInput;
  Activation: Activation;
  Boolean: Scalars['Boolean'];
  BooleanFieldFilter: BooleanFieldFilter;
  DateFieldFilter: DateFieldFilter;
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  FilterConfig: FilterConfig;
  GetAccountsActivationInput: GetAccountsActivationInput;
  GetAccountsInput: GetAccountsInput;
  GetAccountsResponse: GetAccountsResponse;
  HistoricStats: HistoricStats;
  HistoricStatsId: HistoricStatsId;
  HistoryFilterInput: HistoryFilterInput;
  Int: Scalars['Int'];
  IntFieldFilter: IntFieldFilter;
  JWT: Scalars['JWT'];
  LoginAccountResponse: LoginAccountResponse;
  LoginInput: LoginInput;
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Pagination: Pagination;
  Query: {};
  RegisterInput: RegisterInput;
  ResetCodeInput: ResetCodeInput;
  ResetPasswordInput: ResetPasswordInput;
  Stats: Stats;
  String: Scalars['String'];
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  UpdateEmailInput: UpdateEmailInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailResponse: VerifyEmailResponse;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['Account'];
  _Service: _Service;
  federation__FieldSet: Scalars['federation__FieldSet'];
  link__Import: Scalars['link__Import'];
}>;

export type Federation__ExtendsDirectiveArgs = { };

export type Federation__ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__ExternalDirectiveArgs = {
  reason?: Maybe<Scalars['String']>;
};

export type Federation__ExternalDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__ExternalDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__InaccessibleDirectiveArgs = { };

export type Federation__InaccessibleDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__InaccessibleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__OverrideDirectiveArgs = {
  from: Scalars['String'];
};

export type Federation__OverrideDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__OverrideDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__ProvidesDirectiveArgs = {
  fields: Scalars['federation__FieldSet'];
};

export type Federation__ProvidesDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__ProvidesDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__RequiresDirectiveArgs = {
  fields: Scalars['federation__FieldSet'];
};

export type Federation__RequiresDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__RequiresDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Federation__TagDirectiveArgs = {
  name: Scalars['String'];
};

export type Federation__TagDirectiveResolver<Result, Parent, ContextType = Context, Args = Federation__TagDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  as?: Maybe<Scalars['String']>;
  for?: Maybe<Link__Purpose>;
  import?: Maybe<Array<Maybe<Scalars['link__Import']>>>;
  url?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ShareableDirectiveArgs = { };

export type ShareableDirectiveResolver<Result, Parent, ContextType = Context, Args = ShareableDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  activation?: Resolver<Maybe<ResolversTypes['Activation']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ActivationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Activation'] = ResolversParentTypes['Activation']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type GetAccountsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetAccountsResponse'] = ResolversParentTypes['GetAccountsResponse']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoricStatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HistoricStats'] = ResolversParentTypes['HistoricStats']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['HistoricStatsId']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoricStatsIdResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HistoricStatsId'] = ResolversParentTypes['HistoricStatsId']> = ResolversObject<{
  DAY_OF_MONTH?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  DAY_OF_WEEK?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  DAY_OF_YEAR?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  HOUR?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  MILLISECONDS?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  MINUTES?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  MONTH?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  SECONDS?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  WEEK?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  YEAR?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export type LoginAccountResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginAccountResponse'] = ResolversParentTypes['LoginAccountResponse']> = ResolversObject<{
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<ResolversTypes['LoginAccountResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginInput'>>;
  register?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'registerInput'>>;
  resetActivationCode?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationResetActivationCodeArgs, 'resetCodeInput'>>;
  resetPassword?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'resetInput'>>;
  updateEmail?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationUpdateEmailArgs, 'updateEmailInput'>>;
  verifyEmail?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'verifyEmailInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getAccounts?: Resolver<ResolversTypes['GetAccountsResponse'], ParentType, ContextType, RequireFields<QueryGetAccountsArgs, 'getAccountsInput'>>;
  getMyAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  isAuthenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  history?: Resolver<Maybe<Array<ResolversTypes['HistoricStats']>>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifyEmailResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VerifyEmailResponse'] = ResolversParentTypes['VerifyEmailResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Account', ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Federation__FieldSetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['federation__FieldSet'], any> {
  name: 'federation__FieldSet';
}

export interface Link__ImportScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['link__Import'], any> {
  name: 'link__Import';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Activation?: ActivationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GetAccountsResponse?: GetAccountsResponseResolvers<ContextType>;
  HistoricStats?: HistoricStatsResolvers<ContextType>;
  HistoricStatsId?: HistoricStatsIdResolvers<ContextType>;
  JWT?: GraphQLScalarType;
  LoginAccountResponse?: LoginAccountResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  VerifyEmailResponse?: VerifyEmailResponseResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
  federation__FieldSet?: GraphQLScalarType;
  link__Import?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  federation__extends?: Federation__ExtendsDirectiveResolver<any, any, ContextType>;
  federation__external?: Federation__ExternalDirectiveResolver<any, any, ContextType>;
  federation__inaccessible?: Federation__InaccessibleDirectiveResolver<any, any, ContextType>;
  federation__override?: Federation__OverrideDirectiveResolver<any, any, ContextType>;
  federation__provides?: Federation__ProvidesDirectiveResolver<any, any, ContextType>;
  federation__requires?: Federation__RequiresDirectiveResolver<any, any, ContextType>;
  federation__tag?: Federation__TagDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  shareable?: ShareableDirectiveResolver<any, any, ContextType>;
}>;
