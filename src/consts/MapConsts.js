var MapConsts = {};

export default MapConsts;

var copyMap = function (src, dest) {
    for (let a in src) {
        dest[a] = src[a];
    }
};

export var configForPlayers = function (numPlayers) {
    if (numPlayers >= 4)
        copyMap(MapConsts4, MapConsts);
    else if (numPlayers == 3) {
        copyMap(MapConsts3, MapConsts);
    }
    else {
        copyMap(MapConsts2, MapConsts);
    }
    console.log("init consts", MapConsts);
};



const MapConsts4 = {
    Size: 32,
    StartHealth: 64,
    SizeX: 14,
    SizeY: 9,
    ScaleX: 2,
    ScaleY: 2,
    StartingPositions: [
        {
            x: 2,
            y: 2,
        },
        {
            x: 12,
            y: 8,
        },
        {
            x: 12,
            y: 2,
        },
        {
            x: 2,
            y: 12,
        }
    ]
};

export const Colors = [
    {
        colorStr: '#12fe00',//zielony
        colorNum: 0x12fe00
    },
    {
        colorStr: '#fff859',//rzulty
        colorNum: 0xfff859
    },
    {
        colorStr: '#0decfe',//niebieski
        colorNum: 0x0decfe
    },
    {
        colorStr: '#fe544f',//czerfony
        colorNum: 0xfe544f
    }
];

const MapConsts3 = {
    Size: 32,
    StartHealth: 64,
    SizeX: 11,
    SizeY: 9,
    ScaleX: 2,
    ScaleY: 2,
    StartingPositions: [
        {
            x: 1,
            y: 4,
        },
        {
            x: 6,
            y: 4,
        },
        {
            x: 9,
            y: 4,
        }
    ]
};

const MapConsts2 = {
    Size: 32,
    StartHealth: 64,
    SizeX: 9,
    SizeY: 7,
    ScaleX: 2,
    ScaleY: 2,
    StartingPositions: [
        {
            x: 1,
            y: 3,
        },
        {
            x: 8,
            y: 3,
        },
    ]
};