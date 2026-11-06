import './globals.css';

export const metadata = {
  title: '爪爪动物医院 · 就诊首页',
  description: '预约宠物门诊、查看就诊安排与宠物健康档案。',
};
export const viewport = { themeColor: '#234b39', viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
