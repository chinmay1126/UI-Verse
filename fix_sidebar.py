import re
with open('e:/nsoc26/UI-Verse/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

old_sidebar = r'''\.sidebar \{
  width: 80px;
  transition: width 0\.3s ease;
\}

\.sidebar\.open \{
  width: 220px;
\}

\.sidebar \.brand-text,
\.sidebar-nav span \{
  opacity: 0;
  transition: opacity 0\.2s;
\}

\.sidebar\.open \.brand-text,
\.sidebar\.open \.sidebar-nav span \{
  opacity: 1;
\}

\.sidebar \{
  background: #0f172a; /\* keep dark but softer \*/
\}

\.sidebar-nav a \{
  color: #94a3b8; /\* muted text \*/
\}

\.sidebar-nav a:hover \{
  color: #ffffff;
  background: rgba\(255,255,255,0\.05\);
\}

\.sidebar-nav i \{
  font-size: 16px;   /\* smaller \*/
  opacity: 0\.7;      /\* softer \*/
\}

\.sidebar-nav \.active a \{
  background: rgba\(255,255,255,0\.08\);
  border-left: 3px solid #6366f1;
\}

\.sidebar-nav li \{
  margin: 6px 0;
\}

\.sidebar-nav a \{
  padding: 10px 14px;
\}

\.sidebar \{
  background: rgba\(15, 23, 42, 0\.7\);
  backdrop-filter: blur\(12px\);
\}

/\* Color matching UI theme \*/
\.fa-layer-group \{ color: #5900ff; \} 
\.fa-seedling   \{ color: #008ef3; \} 
\.fa-bolt       \{ color: #ff0400; \} 
\.fa-rocket \{color:rgb\(190, 37, 63\);\}

\.sidebar \{
  width: 200px;   /\* reduce from ~260–300px \*/
\.fa-rocket \{color:rgb\(190, 37, 63\);\}
\.fa-rocket \{color:rgb\(190, 37, 63\)\}'''

new_sidebar = '''.sidebar {
  width: 80px;
  height: 100vh;
  position: fixed;
  top: 0; left: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.sidebar.open {
  width: var(--sidebar-width, 260px);
}

.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }

.sidebar .brand-text,
.sidebar-nav span {
  opacity: 0;
  transition: opacity 0.2s, transform 0.3s ease;
  transform: translateX(-10px);
  white-space: nowrap;
}

.sidebar.open .brand-text,
.sidebar.open .sidebar-nav span {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-brand {
  padding: 30px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 22px;
  font-weight: 800;
  font-family: var(--font-heading, "Syne", sans-serif);
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.sidebar-brand .brand-icon {
  font-size: 28px;
  background: linear-gradient(135deg, #eb6835, #7b61ff, #00f7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hue-rotate 4s infinite linear;
}

@keyframes hue-rotate {
  from { filter: hue-rotate(0deg); }
  to { filter: hue-rotate(360deg); }
}

.sidebar-nav {
  padding: 20px 16px;
  flex: 1;
}

.sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
.sidebar-nav li { margin-bottom: 6px; }

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
}

.sidebar-nav a:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.sidebar.open .sidebar-nav a:hover {
  transform: translateX(6px);
}

.sidebar-nav .active a {
  color: #ffffff;
  background: linear-gradient(90deg, rgba(123, 97, 255, 0.15), transparent);
  border-color: rgba(123, 97, 255, 0.2);
}

.sidebar-nav .active a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #eb6835, #7b61ff);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(123, 97, 255, 0.5);
}

.sidebar-nav i {
  font-size: 18px;
  width: 24px;
  text-align: center;
  opacity: 0.7;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-nav .active a i {
  color: #7b61ff;
  opacity: 1;
  text-shadow: 0 0 12px rgba(123, 97, 255, 0.4);
}

.sidebar-nav a:hover i {
  transform: scale(1.15) rotate(-5deg);
  color: #eb6835;
  opacity: 1;
}

/* Color matching UI theme */
.fa-layer-group { color: #5900ff; } 
.fa-seedling   { color: #008ef3; } 
.fa-bolt       { color: #ff0400; } 
.fa-rocket { color: rgb(190, 37, 63); }'''

css = re.sub(old_sidebar, new_sidebar.replace('\\.', '.'), css)

with open('e:/nsoc26/UI-Verse/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated sidebar")
