export const categories = [
	{
		name: "Пиццы",
	},
	{
		name: "Завтраки",
	},
	{
		name: "Закуски",
	},
	{
		name: "Коктейли",
	},
	{
		name: "Напитки",
	},
];

export const ingredients = [
	{
		name: "Сырный бортик",
		price: 179,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
	},
	{
		name: "Сливочная моцарелла",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
	},
	{
		name: "Сыры чеддер и пармезан",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
	},
	{
		name: "Острый перец халапеньо",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
	},
	{
		name: "Нежный цыпленок",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
	},
	{
		name: "Шампиньоны",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
	},
	{
		name: "Ветчина",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
	},
	{
		name: "Пикантная пепперони",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
	},
	{
		name: "Острая чоризо",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
	},
	{
		name: "Маринованные огурчики",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
	},
	{
		name: "Свежие томаты",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
	},
	{
		name: "Красный лук",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
	},
	{
		name: "Сочные ананасы",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
	},
	{
		name: "Итальянские травы",
		price: 39,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
	},
	{
		name: "Сладкий перец",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
	},
	{
		name: "Кубики брынзы",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
	},
	{
		name: "Митболы",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	{
		name: "Омлет с ветчиной и грибами",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
		categoryId: 2,
	},
	{
		name: "Сырники со сгущенным молоком",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0197fa1a1bf472a090d04933e6a462d8.avif",
		categoryId: 2,
	},
	{
		name: "Омлет с пепперони",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
		categoryId: 2,
	},
	{
		name: "Хашбрауны",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/019591f326f27455a9841fb14785fc27.avif",
		categoryId: 2,
	},
	{
		name: "Дэнвич ветчина и сыр",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
		categoryId: 3,
	},
	{
		name: "Куриные наггетсы",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
		categoryId: 3,
	},
	{
		name: "Картофель из печи с соусом 🌱",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
		categoryId: 3,
	},
	{
		name: "Додстер",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
		categoryId: 3,
	},
	{
		name: "Острый Додстер ",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
		categoryId: 3,
	},
	{
		name: "Чикен ролл",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/019595f503e27410ab6e179c05347231.avif",
		categoryId: 3,
	},
	{
		name: "Банановый молочный коктейль",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
		categoryId: 4,
	},
	{
		name: "Карамельное яблоко молочный коктейль",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
		categoryId: 4,
	},
	{
		name: "Молочный коктейль с печеньем Орео",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
		categoryId: 4,
	},
	{
		name: "Классический молочный коктейль 👶",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
		categoryId: 4,
	},
	{
		name: "Ирландский Капучино",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
		categoryId: 5,
	},
	{
		name: "Кофе Карамельный капучино",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
		categoryId: 5,
	},
	{
		name: "Добрый Кола без сахара",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0197f8650cad733baf4fcfeb53fb32e4.avif",
		categoryId: 5,
	},
	{
		name: "Добрый Кола",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0197f865693f78799a4e92756a2ebe38.avif",
		categoryId: 5,
	},
	{
		name: "Добрый Киви-Виноград",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0197f862fa6871cfa3d9dc39df34aff9.avif",
		categoryId: 5,
	},
	{
		name: "Rich Tea Зеленый с манго",
		imageUrl:
			"https://media.dodostatic.net/image/r:292x292/0197f869012977299dea763d56f31e67.avif",
		categoryId: 5,
	},
];
