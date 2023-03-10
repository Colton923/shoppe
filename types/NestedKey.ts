import type { PopcornFlavors } from './PopcornFlavors'

type DTO = Record<string, any>

type LiteralType = string | number | boolean | bigint

type GetDirtyDTOKeys<O extends DTO> = {
  [K in keyof O]-?: NonNullable<O[K]> extends Array<infer A>
    ? NonNullable<A> extends LiteralType
      ? K
      : K extends string
      ? GetDirtyDTOKeys<NonNullable<A>> extends infer NK
        ? NK extends string
          ? `${K}.${NK}`
          : never
        : never
      : never
    : NonNullable<O[K]> extends LiteralType
    ? K
    : K extends string
    ? GetDirtyDTOKeys<NonNullable<O[K]>> extends infer NK
      ? NK extends string
        ? `${K}.${NK}`
        : never
      : never
    : never
}[keyof O]

type AllDTOKeys = string | number | symbol

type TrashDTOKeys = `${string}.undefined` | number | symbol

type ExcludeTrashDTOKeys<O extends AllDTOKeys> = O extends TrashDTOKeys ? never : O

type GetDTOKeys<O extends DTO> = ExcludeTrashDTOKeys<GetDirtyDTOKeys<O>>

export type NestedKey = GetDTOKeys<PopcornFlavors>
