
// Outline: container for metadata and nodes
function Outline({id, name}) {
    return {id, name};
};

const createOutline = (name) => {
    return Outline({id: 123, name: name});
};

const fetchOutline = (outlineId) => {
    return Outline({});
};

// Node: an element in an outline
function Node({id, outlineId, text, parent, rank}) {
    return {id, outlineId, text, parent, rank};
}

const addNode = (outlineId, text, parent, rank) => {
    return Node({id: 123, outlineId, text, parent, rank});
};

const editNode = (outlineId, nodeId, text) => {
    return Node({});
};

const removeNode = (outlineId, nodeId) => {
    return;
};

// TODO ranking - how to generate ranking orders?
const rankNode = (outlineId, nodeId, rank) => {
    return Node({});
};

const promoteNode(outlineId, nodeId, parent, rank) => {
    return Node({});
};

const fetchOutline

// TODO export some stuff!