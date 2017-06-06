import Door from "./../../assets/images/door.png";
import Entrance from "./../../assets/images/entrance.png";
import Trap01 from "./../../assets/images/trap01.png";
import Trap02 from "./../../assets/images/trap02.png";
import Trap03 from "./../../assets/images/trap03.png";
import Treasure from "./../../assets/images/treasure.png";
import Hall from "./../../assets/images/hall.png";
import Exit from "./../../assets/images/exit.png";
import ClosedExit from "./../../assets/images/closedExit.png";

// walls
import Wall01 from "./../../assets/images/wall01.png";
import Wall02 from "./../../assets/images/wall02.png";

// special scenes
import FirstScene from "./../../assets/images/firstScene.png";
import CastleScene from "./../../assets/images/castle-outside.png";

import * as GameplayActions from "./gameplayActions";

const SpeciaRoomTypes = [
  {
    name: "Lost on an island",
    description: "You woke up on a hill, it's at night and it is very cold. You do not know where you are or where you come from.",
    action: GameplayActions.ACTION_EXPLORE_SORROUNDINGS,
    probSuccess: 100,
    actionSuccess: "You get up and walk around looking for information.",
    actionFailed: "...",
    requirements: [],
    disableButtons: ["left", "right", "up", "down"],
    image: FirstScene
  },
  {
    name: "Castle Entrance",
    description: "You are about to enter this mysterious castle. You look around and there don't seem to be many other options.",
    action: GameplayActions.ACTION_ENTER,
    probSuccess: 100,
    actionSuccess: "After passing the entrance you hear a loud noise of doors closing behind you.",
    actionFailed: "...",
    requirements: [],
    disableButtons: ["left", "right", "up", "down"],
    image: CastleScene
  },
  {
    name: "Giant Door",
    description: "There's is a giant door opened.",
    action: GameplayActions.ACTION_ESCAPE,
    probSuccess: 100,
    actionSuccess: "",
    actionFailed: "",
    requirements: [],
    disableButtons: [],
    image: Exit
  },
  {
    name: "Closed Giant Door",
    description: "There's is a giant door closed with 3 hidden compartments.",
    action: GameplayActions.ACTION_OPEN,
    probSuccess: 100,
    actionSuccess: "",
    actionFailed: "",
    requirements: [],
    disableButtons: [],
    image: ClosedExit
  }
];


const RoomTypes = [
  {
    name: "Wooden Door",
    description: "There's a wooden door blocking your path. Maybe a cooper key could open it.",
    action: GameplayActions.ACTION_OPEN,
    probSuccess: 100,
    actionSuccess: "You opened the door.",
    actionFailed: "You don't have a key to open it.",
    requirements: ["wooden-key"],
    disableButtons: [],
    image: Door
  },
  {
    name: "Trap of thorns",
    description: "You see a trap, trying to jump it could hurt you a lot.",
    action: GameplayActions.ACTION_JUMP,
    probSuccess: 60,
    actionSuccess: "You dodged the trap successfully",
    actionFailed: "You were hurt trying to avoid the trap",
    requirements: [],
    disableButtons: [],
    image: Trap01
  },
  {
    name: "Trap of blades",
    description: "You see a trap, trying to avoid it could hurt you a lot.",
    action: GameplayActions.ACTION_PASS_THROUGH,
    probSuccess: 80,
    actionSuccess: "You dodged the trap successfully",
    actionFailed: "You were hurt trying to avoid the trap",
    requirements: [],
    disableButtons: [],
    image: Trap02
  },
  {
    name: "Trap of hole",
    description: "You see a giant hole in the floor, trying to avoid it could hurt you a lot.",
    action: GameplayActions.ACTION_JUMP,
    probSuccess: 80,
    actionSuccess: "You dodged the trap successfully",
    actionFailed: "You were hurt trying to avoid the trap",
    requirements: [],
    disableButtons: [],
    image: Trap03
  },
  {
    name: "Small Treasure",
    description: "You found a chest, it can have many surprises inside.",
    action: GameplayActions.ACTION_OPEN,
    probSuccess: 100,
    actionSuccess: "You opened the chest and found: ",
    actionFailed: "...",
    requirements: [],
    disableButtons: [],
    image: Treasure
  },
  {
    name: "Hall",
    description: "You came to a giant hall full of old artifacts and rarities. It seems to be a quiet place to look for clues about this place.",
    action: GameplayActions.ACTION_SEARCH_CLUES,
    probSuccess: 100,
    actionSuccess: "",
    actionFailed: "",
    requirements: [],
    disableButtons: [],
    image: Hall
  },
  {
    name: "Mysterious Passage",
    description: "There's a mysterious passage ahead. Who knows where it can leave you.",
    action: GameplayActions.ACTION_ENTER,
    probSuccess: 100,
    actionSuccess: "",
    actionFailed: "",
    requirements: [],
    disableButtons: [],
    image: Entrance
  }
];

const WallRoomTypes = [
  {
    name: "Wall",
    description: "A wall is blocking your path.",
    action: GameplayActions.ACTION_BACK,
    probSuccess: 100,
    actionSuccess: "",
    actionFailed: "",
    requirements: [],
    disableButtons: ["left", "right", "up", "down"],
    image: Wall01
  },
  {
    name: "Wall",
    description: "A wall is blocking your path.",
    action: GameplayActions.ACTION_BACK,
    probSuccess: 100,
    actionSuccess: "",
    actionFailed: "",
    requirements: [],
    disableButtons: ["left", "right", "up", "down"],
    image: Wall02
  }
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// For now we will keep the world generation simple.
// TODO: add more generation rules.
// TODO: include special scenes in the world generation.
const createWorld = (width, height) => {
  const worldInstance = new Array(width);

  for(let i = 0; i < height; i++) {
    worldInstance[i] = new Array(height);
  }

  for(let i = 0; i < worldInstance.length; i++) {
    for(let j = 0; j < worldInstance[i].length; j++) {

      if(i === 0 || j === 0 || i === worldInstance[i].length - 1 || j === worldInstance[j].length - 1) {
        worldInstance[i][j] = WallRoomTypes[0, getRandomInt(0, WallRoomTypes.length)];
      } else {
        worldInstance[i][j] = RoomTypes[0, getRandomInt(0, RoomTypes.length)];
      }

    }
  }

  const posExitX = getRandomInt(0, worldInstance.length - 1);
  const posExitY = getRandomInt(0, worldInstance[0].length - 1);

  worldInstance[posExitX][posExitY] = SpeciaRoomTypes[3]; // we set 1 exit randomly.

  worldInstance[1][1] = RoomTypes[5]; // first room is always a hall.

  return worldInstance;
};

export { createWorld };