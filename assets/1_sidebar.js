const sidebar = document.querySelector('.sidebar');
const sidebarHeading = document.querySelector('.sidebar-heading');

sidebarHeading.addEventListener('click', () => {
  sidebar.classList.toggle('show'); /* 切换侧边栏的显示和隐藏状态 */
});

