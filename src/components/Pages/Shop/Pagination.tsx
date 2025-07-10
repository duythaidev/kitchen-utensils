import { Button } from "@/components/shadcn/button";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

interface IProps {
    page: number,
    totalPages: number,
    goToPage: (e: number) => void
}
const Pagination = ({ page, totalPages, goToPage }: IProps) => {
    return (
        <div className="mt-5 flex justify-end items-center  border-t border-gray-200 pt-6">
            <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="flex w-fit items-center justify-center text-sm font-medium">
                    Page {page} of {totalPages || 1}
                </div>
                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => goToPage(1)}
                        disabled={page <= 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => goToPage(page - 1)}
                        disabled={page <= 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-8 lg:flex"
                        size="icon"
                        onClick={() => goToPage(page + 1)}
                        disabled={page >= totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-8 lg:flex"
                        size="icon"
                        onClick={() => goToPage(totalPages)}
                        disabled={page >= totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default Pagination