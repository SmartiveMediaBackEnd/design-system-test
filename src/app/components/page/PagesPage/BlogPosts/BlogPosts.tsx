import { useTranslation } from 'react-i18next';
import TopSectionBlogPostsAndSection from './TopSectionBlogPostsAndPagesSection';
import BlogPostsTable from './BlogPostsTable';
import { getImageUrl } from 'src/app/utils';
import { BlogPostInterface } from 'src/app/interface/BlogPostInterface';

export default function BlogPosts() {
	//  hooks
	const { t } = useTranslation();

	const Blogs: BlogPostInterface[] = [
		{
			id: '1',
			visibility: false,
			img: getImageUrl('images/product.png'),
			title: 'mohamed Mostafa',
			describtion: '01064545565',
		},
	];
	return (
		<div className='flex flex-col'>
			<TopSectionBlogPostsAndSection addButton={t('Add post')} path='add_blog' />
			<BlogPostsTable Blogs={Blogs} />
		</div>
	);
}
