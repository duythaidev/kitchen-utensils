import Link from "next/link";

interface PageHeaderProps {
    title: string;
    breadcrumbs: Breadcrumb[];
}
interface Breadcrumb {
    name: string;
    link: string;
}

const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-baseline flex-wrap border-b border-gray-200 py-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>
                <div className="place-items-end self-center">
                    <nav className="flex my-auto flex-wrap" aria-label="Breadcrumb">
                        <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse mt-5 md:pt-0!">
                            {breadcrumbs.map((label, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                return (
                                    <li key={index} className="inline-flex items-center">
                                        {index > 0 && (
                                            <svg className="h-5 w-5 text-gray-400 rtl:rotate-180 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                            </svg>
                                        )}
                                        {isLast ? (
                                            <Link href={label.link} className="text-sm font-medium text-gray-500 dark:text-gray-400">{label.name}</Link>
                                        ) : (
                                            <Link href={label.link} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-500">
                                                {index === 0 && (
                                                    <svg className="me-2.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                                    </svg>
                                                )}
                                                {label.name}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                </div>
            </div>
        </main>
    );
};

export default PageHeader;
