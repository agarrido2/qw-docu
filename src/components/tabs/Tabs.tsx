import {Slot, useSignal, component$ } from "@builder.io/qwik";

interface Tab {
    id: string;
    label: string;
    
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export const Tabs = component$<TabsProps>(({ tabs, defaultTab }) => {
    const activeTab = useSignal(defaultTab || tabs[0].id);
  return (
    <div>
        {/* El tab de navegacion */}
        <div class="border-b border-gray-600">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick$={() => (activeTab.value = tab.id)}
                        class={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                            ${activeTab.value === tab.id
                                ? 'border-blue-400 text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                        aria-current={activeTab.value === tab.id ? 'page' : undefined}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
        {/* El contenido de cada tab */}
        <div class="mt-8">
            {tabs.map((tab) => (
                <div 
                key={tab.id}
                class={`${activeTab.value === tab.id ? 'block' : 'hidden'}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                >
                    <Slot name={tab.id} />
                </div>
            ))}
        </div>
    </div>
  )
});