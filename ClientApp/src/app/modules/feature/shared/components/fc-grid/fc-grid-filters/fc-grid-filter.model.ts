export class FcGridFilterModel {
  constructor(
    public type: FcGridFilterType,
    public name: string,
    public value: string | undefined= undefined
  ) { }

  serialize() {
    return `${this.name}${this.type}${this.value}`;
  }
}

export enum FcGridFilterType {
  Equals = "==",
  NotEqual = "!=",
  GreaterThan = ">",
  LessThan = "<",
  Contains = "@=",
  StartsWith = "_=",
  CaseInsensitiveContains = "@=*",
  CaseInsensitiveStartsWith = "_=*",
  CaseInsensitiveEqual = "==*"
}
