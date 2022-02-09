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
  DateTime: any;
  ObjectID: any;
  _Any: any;
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ObjectID'];
  activation?: Maybe<Activation>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
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

export type BooleanArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
};

export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

export type FilterConfig = {
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  pagination?: InputMaybe<Pagination>;
};

export type GetAccountsActivationInput = {
  verified: BooleanFieldFilter;
};

export type GetAccountsInput = {
  _id?: InputMaybe<StringFieldFilter>;
  activation?: InputMaybe<GetAccountsActivationInput>;
  config?: InputMaybe<FilterConfig>;
  email?: InputMaybe<StringFieldFilter>;
};

export type GetAccountsResponse = {
  __typename?: 'GetAccountsResponse';
  data?: Maybe<Array<Account>>;
  stats?: Maybe<Stats>;
};

export type IntArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
};

export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  int: Scalars['Int'];
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
  token: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
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
  email: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
};

export type ResetCodeInput = {
  email: Scalars['String'];
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type StringArrayFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  string: Array<Scalars['String']>;
};

export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type UpdateEmailInput = {
  email: Scalars['String'];
};

export type VerifyEmailInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  message: Scalars['String'];
};

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
  Activation: ResolverTypeWrapper<Activation>;
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  FilterConfig: FilterConfig;
  GetAccountsActivationInput: GetAccountsActivationInput;
  GetAccountsInput: GetAccountsInput;
  GetAccountsResponse: ResolverTypeWrapper<GetAccountsResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
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
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  UpdateEmailInput: UpdateEmailInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailResponse: ResolverTypeWrapper<VerifyEmailResponse>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['Account'];
  _Service: ResolverTypeWrapper<_Service>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Activation: Activation;
  Boolean: Scalars['Boolean'];
  BooleanArrayFilter: BooleanArrayFilter;
  BooleanFieldFilter: BooleanFieldFilter;
  DateTime: Scalars['DateTime'];
  FilterConfig: FilterConfig;
  GetAccountsActivationInput: GetAccountsActivationInput;
  GetAccountsInput: GetAccountsInput;
  GetAccountsResponse: GetAccountsResponse;
  Int: Scalars['Int'];
  IntArrayFilter: IntArrayFilter;
  IntFieldFilter: IntFieldFilter;
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
  StringArrayFilter: StringArrayFilter;
  StringFieldFilter: StringFieldFilter;
  UpdateEmailInput: UpdateEmailInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailResponse: VerifyEmailResponse;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['Account'];
  _Service: _Service;
}>;

export type ExtendsDirectiveArgs = { };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  activation?: Resolver<Maybe<ResolversTypes['Activation']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type GetAccountsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetAccountsResponse'] = ResolversParentTypes['GetAccountsResponse']> = ResolversObject<{
  data?: Resolver<Maybe<Array<ResolversTypes['Account']>>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginAccountResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginAccountResponse'] = ResolversParentTypes['LoginAccountResponse']> = ResolversObject<{
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Activation?: ActivationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GetAccountsResponse?: GetAccountsResponseResolvers<ContextType>;
  LoginAccountResponse?: LoginAccountResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  VerifyEmailResponse?: VerifyEmailResponseResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
}>;
