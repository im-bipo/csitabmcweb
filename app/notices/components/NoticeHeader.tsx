"use client";
import React from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Form from "next/form";

import { useSearchParams } from "next/navigation";
const NoticeHeader = () => {
  return (
    <header className="pt-2 border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/notices">
            <h1 className="text-xl font-bold text-primary">Notice Board</h1>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Suspense to handle asynchronous data */}
          <Suspense fallback={<div>Loading search bar...</div>}>
            <SearchForm />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default NoticeHeader;

function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  return (
    <Form
      action="/notices/search"
      className="w-full max-w-lg flex items-center space-x-2"
    >
      <Input
        type="search"
        name="query"
        defaultValue={search as string}
        placeholder="Search notices..."
        className=""
      />
      <Button type="submit" variant="ghost" size="icon" className="shrink-0">
        <Search className="h-4 w-4" />
      </Button>
    </Form>
  );
}
