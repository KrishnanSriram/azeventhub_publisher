'use strict';
const uuid = require('uuid');
const { EventHubProducerClient, EventHubConsumerClient, earliestEventPosition } = require('@azure/event-hubs');
const connectionString = process.env.AZURE_EVENTHUB_CONNECTION_STRING;
const partition_key = process.env.AZURE_EVENTHUB_PARTITION_KEY;
const eventHubName = process.env.AZURE_EVENTHUB_NAME;
const users = [];
const consumerGroup = '$Default'; // name of the default consumer group

const add_user = async (firstName, lastName, email) => {
  const producer = new EventHubProducerClient(connectionString, eventHubName);
  const user = {
    userId: uuid.v4(),
    firstName,
    lastName,
    email,
  };
  const batch = await producer.createBatch({ partitionId: 0 });
  // batch.tryAdd(user);
  batch.tryAdd({ body: user });
  // Send the batch to the event hub.
  await producer.sendBatch(batch);
  await producer.close();
  console.log(`User with ID ${user.userId} has been sent over to Eventhub.`);
  users.push(user);
  return user;
};

const list_users = () => {
  return users;
};

module.exports = {
  add_user,
  list_users
};
