export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

type UnionToFunctions<U> = U extends unknown ? (k: U) => void : never

type IntersectionOfFunctionsToType<F> = F extends {
  (a: infer A): void
  (b: infer B): void
  (c: infer C): void
}
  ? [A, B, C]
  : F extends { (a: infer A): void; (b: infer B): void }
  ? [A, B]
  : F extends { (a: infer A): void }
  ? [A]
  : never

export type SplitType<T> = IntersectionOfFunctionsToType<
  UnionToIntersection<UnionToFunctions<T>>
>
