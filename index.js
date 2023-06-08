import { init as initWebex } from 'webex';

// Initialize the SDK and make it available to the window
const webex = (window.webex = initWebex({
  credentials: {
    access_token: 'ZmQwODczZTItOTNmNi00NmU5LWIwOTMtMjExYzUyZjVjZThiYThmNTRiYzctNzBl_P0A1_63808cdd-7608-4991-8f79-b2df9bee232a'
  }
}));

// Create a room with the title "My First Room"
webex.rooms
  .create({
    title: 'My First Room!'
  })
  .catch((error) => {
    console.error(error);
  });

// Filter for "My First Room" from the last 10 rooms
webex.rooms
  .list({
    max: 10
  })
  .then((rooms) => {
    // Destructure room properties for its id (aliased to roomId) and title
    const { id: roomId, title } = rooms.items.filter(
      room => room.title === 'My First Room!'
    )[0];

    // Post message "Hello World!" to "My First Room!"
    webex.messages.create({
      roomId,
      text: 'Hello World!'
    });

    // Log the the room name and the message we created
    return webex.messages
      .list({ roomId, max: 1 })
      // Destructure promised value to get the text property from the first item in items array
      .then(({ items: [{ text }] }) =>
        console.log(`Last message sent to room "${title}": ${text}`)
      );
  })
  .catch((error) => {
    console.error(error);
  });