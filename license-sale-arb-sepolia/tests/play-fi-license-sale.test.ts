import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach
} from "matchstick-as/assembly/index"
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts"
import {
  createCommissionPaidEvent,
  createContractInitializedEvent, createEarlyAccessLicensesClaimedEvent,
  createEarlyAccessSaleStatusSetEvent, createFriendsFamilyLicensesClaimedEvent,
  createFriendsFamilySaleStatusSetEvent, createPartnerLicensesClaimedEvent,
  createPartnerSaleStatusSetEvent, createPartnerTierSetEvent, createPublicLicensesClaimedEvent,
  createPublicSaleStatusSetEvent, createPublicWhitelistLicensesClaimedEvent,
  createReferralUpdatedEvent, createTeamLicensesClaimedEvent,
  createTeamSaleStatusSetEvent, createTierSetEvent, createWhitelistTierSetEvent
} from "./play-fi-license-sale-utils"
import {
  handleCommissionPaid,
  handleContractInitialized, handleEarlyAccessLicensesClaimed,
  handleEarlyAccessSaleStatusSet, handleFriendsFamilyLicensesClaimed,
  handleFriendsFamilySaleStatusSet, handlePartnerLicensesClaimed,
  handlePartnerSaleStatusSet, handlePartnerTierSet,
  handlePublicLicensesClaimed,
  handlePublicSaleStatusSet, handlePublicWhitelistLicensesClaimed,
  handleReferralUpdated, handleTeamLicensesClaimed,
  handleTeamSaleStatusSet, handleTierSet, handleWhitelistTierSet
} from "../src/play-fi-license-sale";

import { log } from '@graphprotocol/graph-ts'
import {Referral} from "../generated/schema";
import {PublicLicensesClaimed} from "../generated/PlayFiLicenseSale/PlayFiLicenseSale";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("ContractInitialized sets up the correct start state", () => {
  beforeAll(() => {
  /*  let previousAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )*/
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("Stat entity checks out", () => {

    assert.entityCount("Stat", 1)

     assert.fieldEquals(
        "Stat",
        "0",
        "totalClaims",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "totalProceeds",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicProceeds",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicClaims",
        "0"
    )
  })

  test("Phase entities checks out", () => {

    assert.entityCount("Phase", 5)

    assert.fieldEquals(
        "Phase",
        "team",
        "name",
        "team"
    )

    assert.fieldEquals(
        "Phase",
        "team",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "friends_family",
        "name",
        "friends_family"
    )

    assert.fieldEquals(
        "Phase",
        "friends_family",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "early_access",
        "name",
        "early_access"
    )

    assert.fieldEquals(
        "Phase",
        "early_access",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "public",
        "name",
        "public"
    )

    assert.fieldEquals(
        "Phase",
        "public",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "whitelist",
        "name",
        "whitelist"
    )

    assert.fieldEquals(
        "Phase",
        "whitelist",
        "active",
        "false"
    )

  })

})

describe("TeamSaleStatusSet sets the correct team sale status", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("State is set to true", () => {

    assert.fieldEquals(
        "Phase",
        "team",
        "active",
        "false"
    )

    let newTeamSaleStatusSetEvent = createTeamSaleStatusSetEvent(true)
    handleTeamSaleStatusSet(newTeamSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "team",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "team",
        "active",
        "true"
    )

    let newTeamSaleStatusSetEvent = createTeamSaleStatusSetEvent(false)
    handleTeamSaleStatusSet(newTeamSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "team",
        "active",
        "false"
    )

  })

})

describe("FriendsFamilySaleStatusSet sets the correct friends and family sale status", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("State is set to true", () => {

    assert.fieldEquals(
        "Phase",
        "friends_family",
        "active",
        "false"
    )

    let newFriendsFamilySaleStatusSetEvent = createFriendsFamilySaleStatusSetEvent(true)
    handleFriendsFamilySaleStatusSet(newFriendsFamilySaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "friends_family",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "friends_family",
        "active",
        "true"
    )

    let newFriendsFamilySaleStatusSetEvent = createFriendsFamilySaleStatusSetEvent(false)
    handleFriendsFamilySaleStatusSet(newFriendsFamilySaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "friends_family",
        "active",
        "false"
    )

  })

})

describe("EarlyAccessSaleStatusSet sets the correct early access sale status", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("State is set to true", () => {

    assert.fieldEquals(
        "Phase",
        "early_access",
        "active",
        "false"
    )

    let newEarlyAccessSaleStatusSetEvent = createEarlyAccessSaleStatusSetEvent(true)
    handleEarlyAccessSaleStatusSet(newEarlyAccessSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "early_access",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "early_access",
        "active",
        "true"
    )

    let newEarlyAccessSaleStatusSetEvent = createEarlyAccessSaleStatusSetEvent(false)
    handleEarlyAccessSaleStatusSet(newEarlyAccessSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "early_access",
        "active",
        "false"
    )

  })

})

describe("PartnerSaleStatusSet sets the correct partner sale status", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("State is set to true", () => {

    let newPartnerSaleStatusSetEvent = createPartnerSaleStatusSetEvent(false,"POLYGON")
    handlePartnerSaleStatusSet(newPartnerSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "partner_POLYGON",
        "active",
        "false"
    )

    newPartnerSaleStatusSetEvent = createPartnerSaleStatusSetEvent(true,"POLYGON")
    handlePartnerSaleStatusSet(newPartnerSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "partner_POLYGON",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    let newPartnerSaleStatusSetEvent = createPartnerSaleStatusSetEvent(true,"POLYGON")
    handlePartnerSaleStatusSet(newPartnerSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "partner_POLYGON",
        "active",
        "true"
    )

    newPartnerSaleStatusSetEvent = createPartnerSaleStatusSetEvent(false, "POLYGON")
    handlePartnerSaleStatusSet(newPartnerSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "partner_POLYGON",
        "active",
        "false"
    )

  })

})

describe("PublicSaleStatusSet sets the correct public sale status", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("State is set to true", () => {

    assert.fieldEquals(
        "Phase",
        "public",
        "active",
        "false"
    )

    let newPublicSaleStatusSetEvent = createPublicSaleStatusSetEvent(true)
    handlePublicSaleStatusSet(newPublicSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "public",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "public",
        "active",
        "true"
    )

    let newPublicSaleStatusSetEvent = createPublicSaleStatusSetEvent(false)
    handlePublicSaleStatusSet(newPublicSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "public",
        "active",
        "false"
    )

  })

})

describe("ReferralUpdated sets the correct referral entity", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("Referral is initialized when it does not exist", () => {

    let newReferralUpdatedEvent = createReferralUpdatedEvent("REFERRAL", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"))
    handleReferralUpdated(newReferralUpdatedEvent)

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "activeSince",
        newReferralUpdatedEvent.block.timestamp.toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalCommission",
        "0"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalUsed",
        "0"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "code",
        "REFERRAL"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "recipient",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })

  test("Referral is updated when it does exist", () => {

    let newReferralUpdatedEvent1 = createReferralUpdatedEvent("REFERRAL2", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"))
    handleReferralUpdated(newReferralUpdatedEvent1)

    let newCommissionPaidEvent = createCommissionPaidEvent("REFERRAL", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100))
    handleCommissionPaid(newCommissionPaidEvent)

    let newReferralUpdatedEvent2 = createReferralUpdatedEvent("REFERRAL2", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"))
    handleReferralUpdated(newReferralUpdatedEvent2)

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalCommission",
        "100"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalUsed",
        "1"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "code",
        "REFERRAL2"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "recipient",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })
})

describe("TierSet sets the correct tier settings", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("Tier is correctly initialized", () => {

    let newTierSetEvent = createTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(1000), BigInt.fromI32(5), BigInt.fromI32(0), BigInt.fromI32(100))
    handleTierSet(newTierSetEvent)

    assert.fieldEquals(
        "Tier",
        "public_1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "price",
        "1000"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "individualCap",
        "5"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "totalCap",
        "100"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "type",
        "public"
    )

  })

  test("Existing tier is correctly modified", () => {

    let newTierSetEvent = createTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleTierSet(newTierSetEvent)

    assert.fieldEquals(
        "Tier",
        "public_1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "price",
        "2000"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "individualCap",
        "10"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "totalCap",
        "500"
    )

    assert.fieldEquals(
        "Tier",
        "public_1",
        "type",
        "public"
    )

  })

})

describe("WhitelistTierSet sets the correct whitelist tier settings", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("Whitelist tier is correctly initialized", () => {

    let newTierSetEvent = createWhitelistTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(1000), BigInt.fromI32(5), BigInt.fromI32(0), BigInt.fromI32(100))
    handleWhitelistTierSet(newTierSetEvent)

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "price",
        "1000"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "individualCap",
        "5"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "totalCap",
        "100"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "type",
        "whitelist"
    )

  })

  test("Existing whitelist tier is correctly modified", () => {

    let newTierSetEvent = createWhitelistTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleWhitelistTierSet(newTierSetEvent)

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "price",
        "2000"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "individualCap",
        "10"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "totalCap",
        "500"
    )

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "type",
        "whitelist"
    )

  })

})

describe("PartnerTierSet sets the correct partner tier settings", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("Partner tier is correctly initialized", () => {

    let newTierSetEvent = createPartnerTierSetEvent("POLYGON",BigInt.fromI32(1), BigInt.fromI32(1000), BigInt.fromI32(5), BigInt.fromI32(0), BigInt.fromI32(100))
    handlePartnerTierSet(newTierSetEvent)

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "price",
        "1000"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "individualCap",
        "5"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "totalCap",
        "100"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "type",
        "partner_POLYGON"
    )

  })

  test("Existing partner tier is correctly modified", () => {

    let newTierSetEvent = createPartnerTierSetEvent("POLYGON",BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handlePartnerTierSet(newTierSetEvent)

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "price",
        "2000"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "individualCap",
        "10"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "totalCap",
        "500"
    )

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "type",
        "partner_POLYGON"
    )

  })

})

describe("CommissionPaid does the correct commission updates", () => {
  beforeAll(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  test("Commission total and total used are correctly updated", () => {

    let newReferralUpdatedEvent = createReferralUpdatedEvent("REFERRAL", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"))
    handleReferralUpdated(newReferralUpdatedEvent)

    let newCommissionPaidEvent = createCommissionPaidEvent("REFERRAL", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000))
    handleCommissionPaid(newCommissionPaidEvent)

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalCommission",
        "1000"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalUsed",
        "1"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "code",
        "REFERRAL"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "recipient",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })

})

describe("PublicLicensesClaimed does the correct updates upon public license claims", () => {

  beforeEach(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
    let newTierSetEvent = createTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleTierSet(newTierSetEvent)
  })

  afterEach(() => {
    clearStore()
  })

  test("Account is updated correctly", () => {

    let newPublicLicensesClaimedEvent = createPublicLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicLicensesClaimed(newPublicLicensesClaimedEvent)

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalLicenses",
        "100"
    )

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalPaid",
        "1000"
    )

  })

  test("Claims updated correctly", () => {

    let newReferralUpdatedEvent1 = createReferralUpdatedEvent("REFERRAL2", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"))
    handleReferralUpdated(newReferralUpdatedEvent1)

    let newPublicLicensesClaimedEvent = createPublicLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"REFERRAL2")
    handlePublicLicensesClaimed(newPublicLicensesClaimedEvent)

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "tier",
        "public_1"
    )

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "amount",
        "100"
    )

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "paid",
        "1000"
    )

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "phase",
        "public"
    )

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })

  test("Tier is updated correctly", () => {

    let newPublicLicensesClaimedEvent = createPublicLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicLicensesClaimed(newPublicLicensesClaimedEvent)

    assert.fieldEquals(
        "Tier",
        "public_1",
        "claimed",
        "100"
    )

  })

  test("Stats are updated correctly", () => {

    let newPublicLicensesClaimedEvent = createPublicLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicLicensesClaimed(newPublicLicensesClaimedEvent)

    assert.fieldEquals(
        "Stat",
        "0",
        "totalClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "totalProceeds",
        "1000"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicProceeds",
        "1000"
    )

  })

})

describe("PublicWhitelistLicensesClaimed does the correct updates upon public license claims", () => {

  beforeEach(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
    let newTierSetEvent = createWhitelistTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleWhitelistTierSet(newTierSetEvent)
  })

  afterEach(() => {
    clearStore()
  })

  test("Account is updated correctly", () => {

    let newPublicWhitelistLicensesClaimedEvent = createPublicWhitelistLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicWhitelistLicensesClaimed(newPublicWhitelistLicensesClaimedEvent)

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalLicenses",
        "100"
    )

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalPaid",
        "1000"
    )

  })

  test("Claims updated correctly", () => {

    let newReferralUpdatedEvent1 = createReferralUpdatedEvent("REFERRAL2", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"))
    handleReferralUpdated(newReferralUpdatedEvent1)

    let newPublicWhitelistLicensesClaimedEvent = createPublicWhitelistLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"REFERRAL2")
    handlePublicWhitelistLicensesClaimed(newPublicWhitelistLicensesClaimedEvent)

    assert.fieldEquals(
        "Claim",
        newPublicWhitelistLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicWhitelistLicensesClaimedEvent.transactionLogIndex.toString(),
        "tier",
        "whitelist_1"
    )

    assert.fieldEquals(
        "Claim",
        newPublicWhitelistLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicWhitelistLicensesClaimedEvent.transactionLogIndex.toString(),
        "account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

    assert.fieldEquals(
        "Claim",
        newPublicWhitelistLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicWhitelistLicensesClaimedEvent.transactionLogIndex.toString(),
        "amount",
        "100"
    )

    assert.fieldEquals(
        "Claim",
        newPublicWhitelistLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicWhitelistLicensesClaimedEvent.transactionLogIndex.toString(),
        "paid",
        "1000"
    )

    assert.fieldEquals(
        "Claim",
        newPublicWhitelistLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicWhitelistLicensesClaimedEvent.transactionLogIndex.toString(),
        "phase",
        "public"
    )

    assert.fieldEquals(
        "Claim",
        newPublicWhitelistLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicWhitelistLicensesClaimedEvent.transactionLogIndex.toString(),
        "referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })

  test("Tier is updated correctly", () => {

    let newPublicWhitelistLicensesClaimedEvent = createPublicWhitelistLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicWhitelistLicensesClaimed(newPublicWhitelistLicensesClaimedEvent)

    assert.fieldEquals(
        "Tier",
        "whitelist_1",
        "claimed",
        "100"
    )

  })

  test("Stats are updated correctly", () => {

    let newPublicWhitelistLicensesClaimedEvent = createPublicWhitelistLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicWhitelistLicensesClaimed(newPublicWhitelistLicensesClaimedEvent)

    assert.fieldEquals(
        "Stat",
        "0",
        "totalClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "totalProceeds",
        "1000"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicProceeds",
        "1000"
    )

  })

})


describe("PartnerLicensesClaimed does the correct updates upon partner license claims", () => {

  beforeEach(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
    let newTierSetEvent = createPartnerTierSetEvent("POLYGON",BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handlePartnerTierSet(newTierSetEvent)
  })

  afterEach(() => {
    clearStore()
  })

  test("Account is updated correctly", () => {

    let newPartnerLicensesClaimedEvent = createPartnerLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromI32(1), BigInt.fromI32(1000), "POLYGON", "REFERRAL")
    handlePartnerLicensesClaimed(newPartnerLicensesClaimedEvent)

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalLicenses",
        "100"
    )

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalPaid",
        "1000"
    )

  })

  test("Claims updated correctly", () => {

    let newReferralUpdatedEvent1 = createReferralUpdatedEvent("REFERRAL2", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"))
    handleReferralUpdated(newReferralUpdatedEvent1)

    let newPartnerLicensesClaimedEvent = createPartnerLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromI32(1), BigInt.fromI32(1000), "POLYGON", "REFERRAL2")
    handlePartnerLicensesClaimed(newPartnerLicensesClaimedEvent)


    assert.fieldEquals(
        "Claim",
        newPartnerLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPartnerLicensesClaimedEvent.transactionLogIndex.toString(),
        "account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

    assert.fieldEquals(
        "Claim",
        newPartnerLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPartnerLicensesClaimedEvent.transactionLogIndex.toString(),
        "amount",
        "100"
    )

    assert.fieldEquals(
        "Claim",
        newPartnerLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPartnerLicensesClaimedEvent.transactionLogIndex.toString(),
        "paid",
        "1000"
    )

    assert.fieldEquals(
        "Claim",
        newPartnerLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPartnerLicensesClaimedEvent.transactionLogIndex.toString(),
        "phase",
        "partner_POLYGON"
    )

    assert.fieldEquals(
        "Claim",
        newPartnerLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPartnerLicensesClaimedEvent.transactionLogIndex.toString(),
        "tier",
        "partner_POLYGON_1"
    )

    assert.fieldEquals(
        "Claim",
        newPartnerLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPartnerLicensesClaimedEvent.transactionLogIndex.toString(),
        "referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicClaims",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicProceeds",
        "0"
    )

  })

  test("Tier is updated correctly", () => {

    let newPartnerLicensesClaimedEvent = createPartnerLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromI32(1), BigInt.fromI32(1000), "POLYGON", "REFERRAL")
    handlePartnerLicensesClaimed(newPartnerLicensesClaimedEvent)

    assert.fieldEquals(
        "Tier",
        "partner_POLYGON_1",
        "claimed",
        "100"
    )

  })

  test("Stats are updated correctly", () => {

    let newPartnerLicensesClaimedEvent = createPartnerLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromI32(1), BigInt.fromI32(1000), "POLYGON", "REFERRAL")
    handlePartnerLicensesClaimed(newPartnerLicensesClaimedEvent)

    assert.fieldEquals(
        "Stat",
        "0",
        "totalClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "totalProceeds",
        "1000"
    )

  })

})

describe("EarlyAccessLicensesClaimed does the correct updates upon early access license claims", () => {

  beforeEach(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
    let newTierSetEvent = createTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleTierSet(newTierSetEvent)
  })

  afterEach(() => {
    clearStore()
  })

  test("Account is updated correctly", () => {

    let newEarlyAccessLicensesClaimedEvent = createEarlyAccessLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
    handleEarlyAccessLicensesClaimed(newEarlyAccessLicensesClaimedEvent)

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalLicenses",
        "100"
    )

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalPaid",
        "1000"
    )

  })

  test("Claims updated correctly", () => {

    let newEarlyAccessLicensesClaimedEvent = createEarlyAccessLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
    handleEarlyAccessLicensesClaimed(newEarlyAccessLicensesClaimedEvent)


    assert.fieldEquals(
        "Claim",
        newEarlyAccessLicensesClaimedEvent.transaction.hash.toHex() + "-" + newEarlyAccessLicensesClaimedEvent.transactionLogIndex.toString(),
        "account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

    assert.fieldEquals(
        "Claim",
        newEarlyAccessLicensesClaimedEvent.transaction.hash.toHex() + "-" + newEarlyAccessLicensesClaimedEvent.transactionLogIndex.toString(),
        "amount",
        "100"
    )

    assert.fieldEquals(
        "Claim",
        newEarlyAccessLicensesClaimedEvent.transaction.hash.toHex() + "-" + newEarlyAccessLicensesClaimedEvent.transactionLogIndex.toString(),
        "paid",
        "1000"
    )

    assert.fieldEquals(
        "Claim",
        newEarlyAccessLicensesClaimedEvent.transaction.hash.toHex() + "-" + newEarlyAccessLicensesClaimedEvent.transactionLogIndex.toString(),
        "phase",
        "early_access"
    )

  })

  test("Stats are updated correctly", () => {

    let newEarlyAccessLicensesClaimedEvent = createEarlyAccessLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
    handleEarlyAccessLicensesClaimed(newEarlyAccessLicensesClaimedEvent)

    assert.fieldEquals(
        "Stat",
        "0",
        "totalClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "totalProceeds",
        "1000"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicClaims",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicProceeds",
        "0"
    )

  })

})

describe("FriendsFamilyLicensesClaimed does the correct updates upon friends and family license claims", () => {

  beforeEach(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
    let newTierSetEvent = createTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleTierSet(newTierSetEvent)
  })

  afterEach(() => {
    clearStore()
  })

  test("Account is updated correctly", () => {

    let newFriendsFamilyLicensesClaimedEvent = createFriendsFamilyLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
    handleFriendsFamilyLicensesClaimed(newFriendsFamilyLicensesClaimedEvent)

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalLicenses",
        "100"
    )

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalPaid",
        "1000"
    )

  })

  test("Claims updated correctly", () => {

    let newFriendsFamilyLicensesClaimedEvent = createFriendsFamilyLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
    handleFriendsFamilyLicensesClaimed(newFriendsFamilyLicensesClaimedEvent)


    assert.fieldEquals(
        "Claim",
        newFriendsFamilyLicensesClaimedEvent.transaction.hash.toHex() + "-" + newFriendsFamilyLicensesClaimedEvent.transactionLogIndex.toString(),
        "account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

    assert.fieldEquals(
        "Claim",
        newFriendsFamilyLicensesClaimedEvent.transaction.hash.toHex() + "-" + newFriendsFamilyLicensesClaimedEvent.transactionLogIndex.toString(),
        "amount",
        "100"
    )

    assert.fieldEquals(
        "Claim",
        newFriendsFamilyLicensesClaimedEvent.transaction.hash.toHex() + "-" + newFriendsFamilyLicensesClaimedEvent.transactionLogIndex.toString(),
        "paid",
        "1000"
    )

    assert.fieldEquals(
        "Claim",
        newFriendsFamilyLicensesClaimedEvent.transaction.hash.toHex() + "-" + newFriendsFamilyLicensesClaimedEvent.transactionLogIndex.toString(),
        "phase",
        "friends_family"
    )

  })

  test("Stats are updated correctly", () => {

    let newFriendsFamilyLicensesClaimedEvent = createFriendsFamilyLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
    handleFriendsFamilyLicensesClaimed(newFriendsFamilyLicensesClaimedEvent)

    assert.fieldEquals(
        "Stat",
        "0",
        "totalClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "totalProceeds",
        "1000"
    )
    assert.fieldEquals(
        "Stat",
        "0",
        "publicClaims",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicProceeds",
        "0"
    )

  })

})

describe("TeamLicensesClaimed does the correct updates upon team license claims", () => {

  beforeEach(() => {
    let newContractInitializedEvent = createContractInitializedEvent()
    handleContractInitialized(newContractInitializedEvent)
    let newTierSetEvent = createTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleTierSet(newTierSetEvent)
  })

  afterEach(() => {
    clearStore()
  })

  test("Account is updated correctly", () => {

    let newTeamLicensesClaimedEvent = createTeamLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100))
    handleTeamLicensesClaimed(newTeamLicensesClaimedEvent)

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalLicenses",
        "100"
    )

    assert.fieldEquals(
        "Account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase(),
        "totalPaid",
        "0"
    )

  })

  test("Claims updated correctly", () => {

    let newTeamLicensesClaimedEvent = createTeamLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100))
    handleTeamLicensesClaimed(newTeamLicensesClaimedEvent)


    assert.fieldEquals(
        "Claim",
        newTeamLicensesClaimedEvent.transaction.hash.toHex() + "-" + newTeamLicensesClaimedEvent.transactionLogIndex.toString(),
        "account",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

    assert.fieldEquals(
        "Claim",
        newTeamLicensesClaimedEvent.transaction.hash.toHex() + "-" + newTeamLicensesClaimedEvent.transactionLogIndex.toString(),
        "amount",
        "100"
    )

    assert.fieldEquals(
        "Claim",
        newTeamLicensesClaimedEvent.transaction.hash.toHex() + "-" + newTeamLicensesClaimedEvent.transactionLogIndex.toString(),
        "paid",
        "0"
    )

    assert.fieldEquals(
        "Claim",
        newTeamLicensesClaimedEvent.transaction.hash.toHex() + "-" + newTeamLicensesClaimedEvent.transactionLogIndex.toString(),
        "phase",
        "team"
    )

  })

  test("Stats are updated correctly", () => {

    let newTeamLicensesClaimedEvent = createTeamLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100))
    handleTeamLicensesClaimed(newTeamLicensesClaimedEvent)

    assert.fieldEquals(
        "Stat",
        "0",
        "totalClaims",
        "100"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "totalProceeds",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicClaims",
        "0"
    )

    assert.fieldEquals(
        "Stat",
        "0",
        "publicProceeds",
        "0"
    )

  })
})