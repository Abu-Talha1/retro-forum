const ALL_POSTS_API = "https://openapi.programming-hero.com/api/retro-forum/posts";
const LATEST_POSTS_API = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";

let readCount = 0;

// 1. Fetch and Display All Posts
const loadAllPosts = async (category = "") => {
    const container = document.getElementById('posts-container');
    container.innerHTML = `<div class="flex justify-center py-10"><span class="loading loading-spinner loading-lg text-[#797DFC]"></span></div>`;
    
    const url = category ? `${ALL_POSTS_API}?category=${category}` : ALL_POSTS_API;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const posts = data.posts;
        
        container.innerHTML = "";
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = "p-6 lg:p-10 bg-[#F3F3F5] rounded-[32px] flex flex-col md:flex-row gap-6 border border-transparent hover:border-[#797DFC] transition-all hover:bg-[#797dfc0d]";
            card.innerHTML = `
                <div class="relative w-16 h-16 shrink-0 mx-auto md:mx-0">
                    <img class="w-full h-full rounded-2xl object-cover" src="${post.image}" />
                    <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full ${post.isActive ? 'bg-green-500' : 'bg-red-500'} border-2 border-white"></div>
                </div>
                <div class="flex-grow">
                    <div class="flex gap-4 text-sm font-medium text-[#12132dcc] mb-3">
                        <span># ${post.category}</span>
                        <span>Author: ${post.author.name}</span>
                    </div>
                    <h4 class="text-xl font-bold text-[#12132D] mb-3">${post.title}</h4>
                    <p class="text-gray-500 border-b border-dashed border-gray-300 pb-5 mb-5">${post.description}</p>
                    <div class="flex justify-between items-center">
                        <div class="flex gap-4 lg:gap-8 text-gray-500">
                            <span><i class="fa-regular fa-message mr-2"></i>${post.comment_count}</span>
                            <span><i class="fa-regular fa-eye mr-2"></i>${post.view_count}</span>
                            <span><i class="fa-regular fa-clock mr-2"></i>${post.posted_time} min</span>
                        </div>
                        <button onclick="markAsRead('${post.title.replace(/'/g, "\\'")}', ${post.view_count})" 
                                class="btn btn-circle btn-sm bg-[#10B981] border-none text-white hover:bg-green-600">
                            <i class="fa-solid fa-envelope-open"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `<p class="text-center text-red-500">Error loading posts.</p>`;
    }
};

// 2. Mark as Read (Sidebar logic)
const markAsRead = (title, views) => {
    readCount++;
    document.getElementById('read-count').innerText = readCount;
    
    const container = document.getElementById('mark-as-read-container');
    const div = document.createElement('div');
    div.className = "flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm";
    div.innerHTML = `
        <h5 class="font-bold text-[#12132D] w-2/3">${title}</h5>
        <span class="text-gray-500 text-sm"><i class="fa-regular fa-eye mr-1"></i> ${views}</span>
    `;
    container.appendChild(div);
};

// 3. Fetch and Display Latest Posts
const loadLatestPosts = async () => {
    const container = document.getElementById('latest-posts-container');
    const res = await fetch(LATEST_POSTS_API);
    const posts = await res.json();

    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = "card bg-white border border-gray-200 p-6 rounded-[32px]";
        div.innerHTML = `
            <figure class="mb-6"><img class="rounded-[20px] w-full" src="${post.cover_image}" alt="cover" /></figure>
            <div>
                <p class="text-gray-400 text-sm mb-3"><i class="fa-regular fa-calendar-days mr-2"></i>${post.author.posted_date || 'No Published Date'}</p>
                <h5 class="text-lg font-black text-[#12132D] mb-3">${post.title}</h5>
                <p class="text-gray-500 text-sm mb-6">${post.description}</p>
                <div class="flex items-center gap-4">
                    <img class="w-12 h-12 rounded-full object-cover" src="${post.profile_image}" />
                    <div>
                        <p class="font-bold text-[#12132D]">${post.author.name}</p>
                        <p class="text-sm text-gray-400">${post.author.designation || 'Unknown'}</p>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
};

// 4. Search Handler
const handleSearch = () => {
    const searchText = document.getElementById('search-field').value;
    loadAllPosts(searchText);
};

// Start Load
loadAllPosts();
loadLatestPosts();