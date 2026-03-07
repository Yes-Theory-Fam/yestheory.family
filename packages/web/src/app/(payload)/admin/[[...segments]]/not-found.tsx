import config from "@payload-config";
import { NotFoundPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";

type Args = {
	params: Promise<{
		segments: string[];
	}>;
	searchParams: Promise<{
		[key: string]: string | string[];
	}>;
};

const NotFound = ({ params, searchParams }: Args) =>
	NotFoundPage({ config, importMap, params, searchParams });

export default NotFound;
