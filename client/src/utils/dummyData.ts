

const getUnsplashImageWithReducedQuality = (url: string) => `${url}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`
export default [
	{
		sku: 'prod-1',
		image: getUnsplashImageWithReducedQuality("https://images.unsplash.com/photo-1523275335684-37898b6baf30"),
		seller: "",
		amount: "0.01",
		title: "Smartwatch 3.0 - White"
	},
	{
		sku: 'prod-2',
		image: getUnsplashImageWithReducedQuality("https://images.unsplash.com/photo-1542291026-7eec264c27ff"),
		seller: "",
		amount: "0.004",
		title: "Nike Fly - Red"
	},
	{
		sku: 'prod-3',
		image: getUnsplashImageWithReducedQuality("https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3"),
		seller: "",
		amount: "0.02",
		title: "Headphone Beats - Gold"
	}
];
