import * as migration_20231202_131425 from "./20231202_131425";
import * as migration_20231217_141637 from "./20231217_141637";
import * as migration_20231223_201544 from "./20231223_201544";
import * as migration_20240106_233717 from "./20240106_233717";
import * as migration_20240112_181047 from "./20240112_181047";
import * as migration_20240127_175425 from "./20240127_175425";
import * as migration_20240821_202231 from "./20240821_202231";
import * as migration_20251206_181414 from "./20251206_181414";

export const migrations = [
	{
		up: migration_20231202_131425.up,
		down: migration_20231202_131425.down,
		name: "20231202_131425",
	},
	{
		up: migration_20231217_141637.up,
		down: migration_20231217_141637.down,
		name: "20231217_141637",
	},
	{
		up: migration_20231223_201544.up,
		down: migration_20231223_201544.down,
		name: "20231223_201544",
	},
	{
		up: migration_20240106_233717.up,
		down: migration_20240106_233717.down,
		name: "20240106_233717",
	},
	{
		up: migration_20240112_181047.up,
		down: migration_20240112_181047.down,
		name: "20240112_181047",
	},
	{
		up: migration_20240127_175425.up,
		down: migration_20240127_175425.down,
		name: "20240127_175425",
	},
	{
		up: migration_20240821_202231.up,
		down: migration_20240821_202231.down,
		name: "20240821_202231",
	},
	{
		up: migration_20251206_181414.up,
		down: migration_20251206_181414.down,
		name: "20251206_181414",
	},
];
