// 1. Read the lore data supplied by Django.
const loreDataElement = document.querySelector("#lore-data");
const loreData = JSON.parse(loreDataElement.textContent);

// 2. Define the hierarchy of lore categories and topics. This doesnt store the entire lore data, just the structure of the encyclopedia. The actual lore content is stored in the loreData object.
const loreTree = {
    title: "Elarion",
    children: [
        {
            title: "History",
            children: [
                { key: "sundering", children: [] }
            ]
        },
        {
            title: "Ancient Mysteries",
            children: [
                { key: "wells", children: [] },
                { key: "nytherael", children: [] },
                { key: "observer", children: [] }
            ]
        },
        {
            title: "Organizations",
            children: [
                { key: "concordance", children: [] }
            ]
        },
        {
            title: "Cities & Settlements",
            children: [
                { key: "luminara", children: [] },
                { key: "caledonia", children: [] },
                { key: "tarnwatch", children: [] }
            ]
        },
        {
            title: "Natural Regions",
            children: [
                { key: "verdant_expanse", children: [] },
                { key: "ashen_marshes", children: [] }
            ]
        },
    ]
};

// 3. Remember which categories are expanded.
const expandedCategories = new Set();

// 4. Recursively search the hierarchy, then
// recursively check whether this node or any descendant
// contains the search term. The search stops at leaf nodes.
function matchesSearch(node, searchTerm) {
    const title = node.key
        ? loreData[node.key]?.title || ""
        : node.title;

    if (title.toLowerCase().includes(searchTerm)) {
        return true;
    }

    return node.children.some(child =>
        matchesSearch(child, searchTerm)
    );
}

// 5. Recursively create HTML elements.
function createLoreNode(node, searchTerm = "", showAll = false) {
    const item = document.createElement("li");

    if (node.key) {
        const lore = loreData[node.key];

        if (!lore) {
            item.textContent = `Missing lore: ${node.key}`;
            return item;
        }

        const link = document.createElement("a");
        link.textContent = lore.title;
        link.href = `?topic=${encodeURIComponent(node.key)}`;
        link.classList.add("lore-link");

        item.appendChild(link);
    } else {
        const categoryButton = document.createElement("button");
        categoryButton.type = "button";
        categoryButton.textContent = node.title;
        categoryButton.classList.add("lore-category");

        item.appendChild(categoryButton);
    }

    const nodeTitle = node.key
        ? loreData[node.key]?.title || ""
        : node.title;

    const categoryMatches =
        !node.key &&
        searchTerm !== "" &&
        nodeTitle.toLowerCase().includes(searchTerm);

    const showAllChildren = showAll || categoryMatches;

    if (node.children.length > 0) {
        const childList = document.createElement("ul");

        // During search, matching branches expand automatically.
        // Otherwise, restore the player's expanded categories.
        childList.hidden =
            searchTerm === "" &&
            !expandedCategories.has(node.title);

        node.children
            .filter(child =>
                showAllChildren || matchesSearch(child, searchTerm)
            )
            .forEach(child => {
                childList.appendChild(
                    createLoreNode(child, searchTerm, showAllChildren)
                );
            });

        const categoryButton = item.querySelector(".lore-category");

        if (categoryButton) {
            categoryButton.setAttribute(
                "aria-expanded",
                String(!childList.hidden)
            );

            categoryButton.addEventListener("click", () => {
                // Keep matching results visible during a search.
                if (searchTerm !== "") {
                    return;
                }

                childList.hidden = !childList.hidden;

                if (childList.hidden) {
                    expandedCategories.delete(node.title);
                } else {
                    expandedCategories.add(node.title);
                }

                categoryButton.setAttribute(
                    "aria-expanded",
                    String(!childList.hidden)
                );
            });
        }

        item.appendChild(childList);
    }

    return item;
}

// 6. Render the hierarchy.
const treeContainer = document.querySelector("#lore-tree");
const searchInput = document.querySelector("#lore-search");
const noResults = document.querySelector("#no-results");

function renderLoreTree(searchTerm = "") {
    if (!treeContainer) {
        return;
    }

    // Remove the previous HTML tree before rebuilding it.
    treeContainer.replaceChildren();

    const rootList = document.createElement("ul");

    const matchingCategories = loreTree.children.filter(child =>
        matchesSearch(child, searchTerm)
    );

    matchingCategories.forEach(child => {
        rootList.appendChild(createLoreNode(child, searchTerm));
    });

    treeContainer.appendChild(rootList);

    if (noResults) {
        noResults.hidden =
            searchTerm === "" || matchingCategories.length > 0;
    }
}

// 7. Initialize the encyclopedia and listen for searches.
if (treeContainer) {
    renderLoreTree();
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        renderLoreTree(searchTerm);
    });
}