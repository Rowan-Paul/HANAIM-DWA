/**
 * @jest-environment node
 */

"use strict";

const mongoose = require("mongoose");
require("../player");

const Player = mongoose.model("Player");

describe("Player Model Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testPlayerDB", {
      useNewUrlParser: true,
    });
  });

  beforeEach(async () => {
    await Player.create({ _id: "han", capacity: 1 });
  });

  afterEach(async () => {
    await Player.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("dummy exercise", async () => {
    let testPlayer = await Player.findById("han").lean();

    expect(testPlayer._id).toEqual("han");
    expect(testPlayer.capacity).toEqual(1);
    expect(testPlayer.items).toEqual([]);
  });

  test("item can be added if capacity is not yet exceeded", async () => {
    let testPlayer = await Player.findById("han");

    await testPlayer.addItem("sword");

    expect(testPlayer.items.length).toBeLessThanOrEqual(testPlayer.capacity);
  });

  test("item can not be added if nr of items equals the capacity", async () => {
    let testPlayer = await Player.findById("han");

    for (let i = 0; i <= testPlayer.capacity; i++) {
      await testPlayer.addItem("sword");
    }

    expect(testPlayer.items.length).toBeLessThanOrEqual(testPlayer.capacity);
  });
});
