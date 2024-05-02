// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Tier extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Tier entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Tier must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Tier", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Tier | null {
    return changetype<Tier | null>(store.get_in_block("Tier", id));
  }

  static load(id: string): Tier | null {
    return changetype<Tier | null>(store.get("Tier", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get number(): BigInt {
    let value = this.get("number");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set number(value: BigInt) {
    this.set("number", Value.fromBigInt(value));
  }

  get claimed(): BigInt {
    let value = this.get("claimed");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set claimed(value: BigInt) {
    this.set("claimed", Value.fromBigInt(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get totalCap(): BigInt {
    let value = this.get("totalCap");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalCap(value: BigInt) {
    this.set("totalCap", Value.fromBigInt(value));
  }

  get individualCap(): BigInt {
    let value = this.get("individualCap");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set individualCap(value: BigInt) {
    this.set("individualCap", Value.fromBigInt(value));
  }
}

export class Phase extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Phase entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Phase must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Phase", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Phase | null {
    return changetype<Phase | null>(store.get_in_block("Phase", id));
  }

  static load(id: string): Phase | null {
    return changetype<Phase | null>(store.get("Phase", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get active(): boolean {
    let value = this.get("active");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set active(value: boolean) {
    this.set("active", Value.fromBoolean(value));
  }
}

export class Stat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Stat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Stat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Stat", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Stat | null {
    return changetype<Stat | null>(store.get_in_block("Stat", id));
  }

  static load(id: string): Stat | null {
    return changetype<Stat | null>(store.get("Stat", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalClaims(): BigInt {
    let value = this.get("totalClaims");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalClaims(value: BigInt) {
    this.set("totalClaims", Value.fromBigInt(value));
  }

  get totalProceeds(): BigInt {
    let value = this.get("totalProceeds");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalProceeds(value: BigInt) {
    this.set("totalProceeds", Value.fromBigInt(value));
  }
}

export class Referral extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Referral entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Referral must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Referral", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Referral | null {
    return changetype<Referral | null>(store.get_in_block("Referral", id));
  }

  static load(id: string): Referral | null {
    return changetype<Referral | null>(store.get("Referral", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get code(): string {
    let value = this.get("code");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set code(value: string) {
    this.set("code", Value.fromString(value));
  }

  get recipient(): Bytes {
    let value = this.get("recipient");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set recipient(value: Bytes) {
    this.set("recipient", Value.fromBytes(value));
  }

  get commissionPercentage(): BigInt {
    let value = this.get("commissionPercentage");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set commissionPercentage(value: BigInt) {
    this.set("commissionPercentage", Value.fromBigInt(value));
  }

  get discountPercentage(): BigInt {
    let value = this.get("discountPercentage");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set discountPercentage(value: BigInt) {
    this.set("discountPercentage", Value.fromBigInt(value));
  }

  get totalCommission(): BigInt {
    let value = this.get("totalCommission");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalCommission(value: BigInt) {
    this.set("totalCommission", Value.fromBigInt(value));
  }

  get totalUsed(): BigInt {
    let value = this.get("totalUsed");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalUsed(value: BigInt) {
    this.set("totalUsed", Value.fromBigInt(value));
  }

  get activeSince(): BigInt {
    let value = this.get("activeSince");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set activeSince(value: BigInt) {
    this.set("activeSince", Value.fromBigInt(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Account", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Account | null {
    return changetype<Account | null>(store.get_in_block("Account", id));
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalLicenses(): BigInt {
    let value = this.get("totalLicenses");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalLicenses(value: BigInt) {
    this.set("totalLicenses", Value.fromBigInt(value));
  }

  get totalPaid(): BigInt {
    let value = this.get("totalPaid");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalPaid(value: BigInt) {
    this.set("totalPaid", Value.fromBigInt(value));
  }

  get claims(): ClaimLoader {
    return new ClaimLoader("Account", this.get("id")!.toString(), "claims");
  }
}

export class Claim extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Claim entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Claim must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Claim", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Claim | null {
    return changetype<Claim | null>(store.get_in_block("Claim", id));
  }

  static load(id: string): Claim | null {
    return changetype<Claim | null>(store.get("Claim", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get phase(): string {
    let value = this.get("phase");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set phase(value: string) {
    this.set("phase", Value.fromString(value));
  }

  get tier(): string | null {
    let value = this.get("tier");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tier(value: string | null) {
    if (!value) {
      this.unset("tier");
    } else {
      this.set("tier", Value.fromString(<string>value));
    }
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get referral(): string | null {
    let value = this.get("referral");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set referral(value: string | null) {
    if (!value) {
      this.unset("referral");
    } else {
      this.set("referral", Value.fromString(<string>value));
    }
  }

  get paid(): BigInt {
    let value = this.get("paid");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set paid(value: BigInt) {
    this.set("paid", Value.fromBigInt(value));
  }
}

export class ClaimLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): Claim[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<Claim[]>(value);
  }
}
