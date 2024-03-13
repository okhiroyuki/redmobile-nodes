import { EventEmitter } from "node:events";
import type { Node, NodeDef } from "node-red";
import type { RedNodeAPI } from "../../@types/nodeAPI";
import { open } from "../../WebSocketHelper";

module.exports = (RED: RedNodeAPI) => {
	const ev = new EventEmitter();
	open(RED, ev, "/mobile/proximity");

	function RedMobileProximityNode(this: Node, props: NodeDef) {
		RED.nodes.createNode(this, props);

		ev.on("message", (data) => {
			const payload = JSON.parse(data).payload;
			this.send({ payload: payload });
		});
	}

	RED.nodes.registerType("proximity", RedMobileProximityNode);
};
