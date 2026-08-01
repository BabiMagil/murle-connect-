// utils/contentLoader.ts


// ===============================
// IMPORTS
// ===============================


// HISTORY
import article1 from "@/content/history/01-the-origin-of-the-murle.json";
import article2 from "@/content/history/02-murle-ethnic-identity-and-language.json";
import article3 from "@/content/history/03-murle-migration-and-movement.json";
import article4 from "@/content/history/04-murle-settlement-in-pibor.json";
import article5 from "@/content/history/05-murle-clans-and-social-organization.json";
import article6 from "@/content/history/06-murle-leadership-and-age-sets.json";
import article7 from "@/content/history/07-murle-family-life-and-kinship.json";
import article8 from "@/content/history/08-murle-marriage-customs-and-bride-wealth.json";
import article9 from "@/content/history/09-murle-childhood-and-traditional-education.json";
import article10 from "@/content/history/10-murle-cattle-and-the-pastoral-way-of-life.json";
import article11 from "@/content/history/11-hunting-fishing-and-agriculture.json";
import article12 from "@/content/history/12-murle-traditional-religion-and-spiritual-beliefs.json";
import article13 from "@/content/history/13-traditional-law-and-conflict-resolution.json";
import article14 from "@/content/history/14-murle-women-in-history-and-society.json";
import article15 from "@/content/history/15-murle-men-and-community-responsibilities.json";
import article16 from "@/content/history/16-murle-traditional-housing-and-village-life.json";
import article17 from "@/content/history/17-murle-food-and-daily-life-through-history.json";
import article18 from "@/content/history/18-murle-songs-dance-and-oral-traditions.json";
import article19 from "@/content/history/19-murle-relations-with-neighboring-communities.json";
import article20 from "@/content/history/20-the-colonial-period-in-murle-land.json";
import article21 from "@/content/history/21-the-first-sudanese-civil-war-and-the-murle.json";
import article22 from "@/content/history/22-the-second-sudanese-civil-war-and-the-murle.json";
import article23 from "@/content/history/23-the-murle-and-the-independence-of-south-sudan.json";
import article24 from "@/content/history/24-the-post-independence-challenges-of-murle-communities.json";
import article25 from "@/content/history/25-the-modern-murle-identity-and-future.json";


// TRADITIONS

import tradition1 from "@/content/traditions/01-murle-clans-kidongwa-and-traditional-authority.json";
import tradition2 from "@/content/traditions/02-murle-age-sets-buul-and-generations.json";
import tradition3 from "@/content/traditions/03-murle-red-chiefs-alan-ci-merik-and-leadership.json";
import tradition4 from "@/content/traditions/04-murle-birth-and-childhood-traditions.json";
import tradition5 from "@/content/traditions/05-murle-naming-traditions.json";
import tradition6 from "@/content/traditions/06-murle-initiation-and-coming-of-age.json";
import tradition7 from "@/content/traditions/07-murle-marriage-customs-and-bride-wealth.json";
import tradition8 from "@/content/traditions/08-murle-family-life-and-parenthood.json";
import tradition9 from "@/content/traditions/09-murle-cattle-and-pastoral-traditions.json";
import tradition10 from "@/content/traditions/10-murle-food-and-hospitality-traditions.json";

import ageSets from "@/content/traditions/age-sets.json";
import clans from "@/content/traditions/clans.json";
import communityValues from "@/content/traditions/community-values.json";
import familyStructure from "@/content/traditions/family-structure.json";
import leadership from "@/content/traditions/leadership.json";
import marriageCustoms from "@/content/traditions/marriage-customs.json";



// ===============================
// RAW DATA
// ===============================


const historyRaw:any[] = [
article1,article2,article3,article4,article5,
article6,article7,article8,article9,article10,
article11,article12,article13,article14,article15,
article16,article17,article18,article19,article20,
article21,article22,article23,article24,article25
];


const traditionsRaw:any[] = [
tradition1,
tradition2,
tradition3,
tradition4,
tradition5,
tradition6,
tradition7,
tradition8,
tradition9,
tradition10,
ageSets,
clans,
communityValues,
familyStructure,
leadership,
marriageCustoms
];




// ===============================
// FORMAT ARTICLE
// ===============================


function formatArticle(
item:any,
index:number,
category:string
){

return {

...item,


id:
String(
item.id ??
item.slug ??
`${category}-${index+1}`
),


category:
item.category ??
category,


title:
item.title ??
"Untitled Article",


subtitle:
item.subtitle ??
"",


body:
item.body ??
item.content ??
item.description ??
"",


image:
item.image ??
null


};

}



// ===============================
// ARTICLES
// ===============================


export const historyArticles =
historyRaw.map(
(item,index)=>
formatArticle(item,index,"history")
);



export const traditionArticles =
traditionsRaw.map(
(item,index)=>
formatArticle(item,index,"traditions")
);



export const allArticles = [
...historyArticles,
...traditionArticles
];




// ===============================
// GET ARTICLES WITH CATEGORY
// ===============================


export function getArticles(
category?:string
){

if(!category){

return allArticles;

}


return allArticles.filter(

article =>

article.category
?.toLowerCase()
===
category.toLowerCase()

);

}



// ===============================
// OTHER FUNCTIONS
// ===============================


export function getAllArticles(){

return allArticles;

}



export function getHistoryArticles(){

return historyArticles;

}



export function getTraditionArticles(){

return traditionArticles;

}



export function getTraditions(){

return traditionArticles;

}



export function getFeaturedArticle(){

return allArticles[0];

}



export function getLatestStories(
limit:number=10
){

return allArticles.slice(0,limit);

}



export function getPopularProverbs(
limit:number=10
){

return [];

}




// FIX ARTICLE ROUTING

export function getArticleById(id:string){

return allArticles.find(

article =>

String(article.id)
===
String(id)

||
String(article.slug)
===
String(id)

);

}




export function getArticlesByCategory(
category:string
){

return getArticles(category);

}



export function searchArticles(
query:string
){

const q=query.toLowerCase();


return allArticles.filter(

article=>

article.title
?.toLowerCase()
.includes(q)

||

article.body
?.toLowerCase()
.includes(q)

);

}