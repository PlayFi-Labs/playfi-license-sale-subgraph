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
  createPartnerSaleStatusSetEvent, createPublicLicensesClaimedEvent,
  createPublicSaleStatusSetEvent,
  createReferralUpdatedEvent, createTeamLicensesClaimedEvent,
  createTeamSaleStatusSetEvent, createTierSetEvent
} from "./play-fi-license-sale-utils"
import {
  handleCommissionPaid,
  handleContractInitialized, handleEarlyAccessLicensesClaimed,
  handleEarlyAccessSaleStatusSet, handleFriendsFamilyLicensesClaimed,
  handleFriendsFamilySaleStatusSet, handlePartnerLicensesClaimed,
  handlePartnerSaleStatusSet,
  handlePublicLicensesClaimed,
  handlePublicSaleStatusSet,
  handleReferralUpdated, handleTeamLicensesClaimed,
  handleTeamSaleStatusSet, handleTierSet
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
  })

  test("Phase entities checks out", () => {

    assert.entityCount("Phase", 5)

    assert.fieldEquals(
        "Phase",
        "0",
        "name",
        "team"
    )

    assert.fieldEquals(
        "Phase",
        "0",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "1",
        "name",
        "friends_family"
    )

    assert.fieldEquals(
        "Phase",
        "1",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "2",
        "name",
        "early_access"
    )

    assert.fieldEquals(
        "Phase",
        "2",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "3",
        "name",
        "partner"
    )

    assert.fieldEquals(
        "Phase",
        "3",
        "active",
        "false"
    )

    assert.fieldEquals(
        "Phase",
        "4",
        "name",
        "public"
    )

    assert.fieldEquals(
        "Phase",
        "4",
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
        "0",
        "active",
        "false"
    )

    let newTeamSaleStatusSetEvent = createTeamSaleStatusSetEvent(true)
    handleTeamSaleStatusSet(newTeamSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "0",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "0",
        "active",
        "true"
    )

    let newTeamSaleStatusSetEvent = createTeamSaleStatusSetEvent(false)
    handleTeamSaleStatusSet(newTeamSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "0",
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
        "1",
        "active",
        "false"
    )

    let newFriendsFamilySaleStatusSetEvent = createFriendsFamilySaleStatusSetEvent(true)
    handleFriendsFamilySaleStatusSet(newFriendsFamilySaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "1",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "1",
        "active",
        "true"
    )

    let newFriendsFamilySaleStatusSetEvent = createFriendsFamilySaleStatusSetEvent(false)
    handleFriendsFamilySaleStatusSet(newFriendsFamilySaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "1",
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
        "2",
        "active",
        "false"
    )

    let newEarlyAccessSaleStatusSetEvent = createEarlyAccessSaleStatusSetEvent(true)
    handleEarlyAccessSaleStatusSet(newEarlyAccessSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "2",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "2",
        "active",
        "true"
    )

    let newEarlyAccessSaleStatusSetEvent = createEarlyAccessSaleStatusSetEvent(false)
    handleEarlyAccessSaleStatusSet(newEarlyAccessSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "2",
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

    assert.fieldEquals(
        "Phase",
        "3",
        "active",
        "false"
    )

    let newPartnerSaleStatusSetEvent = createPartnerSaleStatusSetEvent(true)
    handlePartnerSaleStatusSet(newPartnerSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "3",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "3",
        "active",
        "true"
    )

    let newPartnerSaleStatusSetEvent = createPartnerSaleStatusSetEvent(false)
    handlePartnerSaleStatusSet(newPartnerSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "3",
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
        "4",
        "active",
        "false"
    )

    let newPublicSaleStatusSetEvent = createPublicSaleStatusSetEvent(true)
    handlePublicSaleStatusSet(newPublicSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "4",
        "active",
        "true"
    )

  })

  test("State is set to false", () => {

    assert.fieldEquals(
        "Phase",
        "4",
        "active",
        "true"
    )

    let newPublicSaleStatusSetEvent = createPublicSaleStatusSetEvent(false)
    handlePublicSaleStatusSet(newPublicSaleStatusSetEvent)

    assert.fieldEquals(
        "Phase",
        "4",
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

    let newReferralUpdatedEvent = createReferralUpdatedEvent("REFERRAL", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(10), BigInt.fromI32(5))
    handleReferralUpdated(newReferralUpdatedEvent)

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "activeSince",
        newReferralUpdatedEvent.block.timestamp.toString()
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "totalCommission",
        "0"
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "totalUsed",
        "0"
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "code",
        "REFERRAL"
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "commissionPercentage",
        BigInt.fromI32(10).toString()
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "discountPercentage",
        BigInt.fromI32(5).toString()
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "recipient",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })

  test("Referral is updated when it does exist", () => {

    let newCommissionPaidEvent = createCommissionPaidEvent("REFERRAL", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100))
    handleCommissionPaid(newCommissionPaidEvent)

    let newReferralUpdatedEvent = createReferralUpdatedEvent("REFERRAL", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(12), BigInt.fromI32(7))
    handleReferralUpdated(newReferralUpdatedEvent)

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "totalCommission",
        "100"
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "totalUsed",
        "1"
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "code",
        "REFERRAL"
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "commissionPercentage",
        BigInt.fromI32(12).toString()
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "discountPercentage",
        BigInt.fromI32(7).toString()
    )

    assert.fieldEquals(
        "Referral",
        "REFERRAL",
        "recipient",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })

  test("standard referral is initialized when it does not exist", () => {

    let newTierSetEvent = createTierSetEvent(BigInt.fromU32(4), BigInt.fromI32(1000), BigInt.fromI32(5), BigInt.fromI32(0), BigInt.fromI32(100))
    handleTierSet(newTierSetEvent)

    let newReferralUpdatedEvent = createReferralUpdatedEvent("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(5), BigInt.fromI32(5))
    handleReferralUpdated(newReferralUpdatedEvent)

    let newPublicLicensesClaimedEvent = createPublicLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(10), BigInt.fromU32(4), BigInt.fromI32(100), "")
    handlePublicLicensesClaimed(newPublicLicensesClaimedEvent)

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "activeSince",
        newPublicLicensesClaimedEvent.block.timestamp.toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "totalCommission",
        "0"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "totalUsed",
        "0"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "code",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "commissionPercentage",
        BigInt.fromI32(5).toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "discountPercentage",
        BigInt.fromI32(5).toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "recipient",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7".toLowerCase()
    )

  })

  test("standard referral is updated when it does exist", () => {

    let newCommissionPaidEvent = createCommissionPaidEvent("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100))
    handleCommissionPaid(newCommissionPaidEvent)

    let newReferralUpdatedEvent = createReferralUpdatedEvent("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(12), BigInt.fromI32(7))
    handleReferralUpdated(newReferralUpdatedEvent)

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "totalCommission",
        "100"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "totalUsed",
        "1"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "code",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "commissionPercentage",
        BigInt.fromI32(12).toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "discountPercentage",
        BigInt.fromI32(7).toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
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
        "1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "price",
        "1000"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "individualCap",
        "5"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "totalCap",
        "100"
    )

  })

  test("Existing tier is correctly modified", () => {

    let newTierSetEvent = createTierSetEvent(BigInt.fromI32(1), BigInt.fromI32(2000), BigInt.fromI32(10), BigInt.fromI32(0), BigInt.fromI32(500))
    handleTierSet(newTierSetEvent)

    assert.fieldEquals(
        "Tier",
        "1",
        "claimed",
        "0"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "number",
        "1"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "price",
        "2000"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "individualCap",
        "10"
    )

    assert.fieldEquals(
        "Tier",
        "1",
        "totalCap",
        "500"
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

    let newReferralUpdatedEvent = createReferralUpdatedEvent("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(5), BigInt.fromI32(5))
    handleReferralUpdated(newReferralUpdatedEvent)

    let newCommissionPaidEvent = createCommissionPaidEvent("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7", Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000))
    handleCommissionPaid(newCommissionPaidEvent)

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "totalCommission",
        "1000"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "totalUsed",
        "1"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "code",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "commissionPercentage",
        BigInt.fromI32(5).toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
        "discountPercentage",
        BigInt.fromI32(5).toString()
    )

    assert.fieldEquals(
        "Referral",
        "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
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

    let newPublicLicensesClaimedEvent = createPublicLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicLicensesClaimed(newPublicLicensesClaimedEvent)

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "tier",
        "1"
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
        "4"
    )

    assert.fieldEquals(
        "Claim",
        newPublicLicensesClaimedEvent.transaction.hash.toHex() + "-" + newPublicLicensesClaimedEvent.transactionLogIndex.toString(),
        "referral",
        "null"
    )

  })

  test("Tier is updated correctly", () => {

    let newPublicLicensesClaimedEvent = createPublicLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(100), BigInt.fromU32(1),BigInt.fromI32(1000),"")
    handlePublicLicensesClaimed(newPublicLicensesClaimedEvent)

    assert.fieldEquals(
        "Tier",
        "1",
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

  })

})


describe("PartnerLicensesClaimed does the correct updates upon partner license claims", () => {

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

    let newPartnerLicensesClaimedEvent = createPartnerLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
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

    let newPartnerLicensesClaimedEvent = createPartnerLicensesClaimedEvent(Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"), BigInt.fromI32(1000), BigInt.fromI32(100))
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
        "3"
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
        "2"
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
        "1"
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
        "0"
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

  })

})