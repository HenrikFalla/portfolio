import ProjectItem from '@/app/(components)/projects/project';

export default async function Project({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	return <ProjectItem slug={slug} />;
}
