import type { CollectionEntry } from "astro:content";
import { createEffect, createSignal, For } from "solid-js";
import ArrowCard from "@components/ArrowCard";
import { cn } from "@lib/utils";

type Props = {
  tags: string[];
  data: CollectionEntry<"products">[];
};

export default function Products({ data, tags }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>());
  const [products, setProducts] = createSignal<CollectionEntry<"products">[]>(
    []
  );

  createEffect(() => {
    setProducts(
      data.filter((entry) =>
        Array.from(filter()).every((value) =>
          entry.data.tags.some(
            (tag: string) => tag.toLowerCase() === String(value).toLowerCase()
          )
        )
      )
    );
  });

  function toggleTag(tag: string) {
    setFilter(
      (prev) =>
        new Set(
          prev.has(tag) ? [...prev].filter((t) => t !== tag) : [...prev, tag]
        )
    );
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Filter Section */}
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">
            Filtr
          </div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li>
                  <button
                    onClick={() => toggleTag(tag)}
                    class={cn(
                      "w-full px-2 py-1 rounded",
                      "whitespace-nowrap overflow-hidden overflow-ellipsis",
                      "flex gap-2 items-center",
                      "bg-black/5 dark:bg-white/10",
                      "hover:bg-black/10 hover:dark:bg-white/15",
                      "transition-colors duration-300 ease-in-out",
                      filter().has(tag) && "text-black dark:text-white"
                    )}
                  >
                    <svg
                      class={cn(
                        "size-5 fill-black/50 dark:fill-white/50",
                        "transition-colors duration-300 ease-in-out",
                        filter().has(tag) && "fill-black dark:fill-white"
                      )}
                    >
                      <use
                        href={`/ui.svg#square`}
                        class={cn(!filter().has(tag) ? "block" : "hidden")}
                      />
                      <use
                        href={`/ui.svg#square-check`}
                        class={cn(filter().has(tag) ? "block" : "hidden")}
                      />
                    </svg>
                    {tag}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>

      {/* Product Grid */}
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2 text-center sm:text-left">
            POKAZYWANIE {products().length} Z {data.length} PRODUKTÓW
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
            {products().map((product) => (
              <ArrowCard entry={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
