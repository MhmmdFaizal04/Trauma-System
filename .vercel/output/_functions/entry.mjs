import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BeuxlP9p.mjs';
import { manifest } from './manifest_BSXscImu.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/analisis/_id_.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/api/admin/analyze/_id_.astro.mjs');
const _page5 = () => import('./pages/api/admin/analyze-all.astro.mjs');
const _page6 = () => import('./pages/api/admin/export.astro.mjs');
const _page7 = () => import('./pages/api/admin/login.astro.mjs');
const _page8 = () => import('./pages/api/admin/logout.astro.mjs');
const _page9 = () => import('./pages/api/admin/responses.astro.mjs');
const _page10 = () => import('./pages/api/init-db.astro.mjs');
const _page11 = () => import('./pages/api/kuisioner.astro.mjs');
const _page12 = () => import('./pages/kuisioner.astro.mjs');
const _page13 = () => import('./pages/terima-kasih.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/analisis/[id].astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/api/admin/analyze/[id].ts", _page4],
    ["src/pages/api/admin/analyze-all.ts", _page5],
    ["src/pages/api/admin/export.ts", _page6],
    ["src/pages/api/admin/login.ts", _page7],
    ["src/pages/api/admin/logout.ts", _page8],
    ["src/pages/api/admin/responses.ts", _page9],
    ["src/pages/api/init-db.ts", _page10],
    ["src/pages/api/kuisioner.ts", _page11],
    ["src/pages/kuisioner.astro", _page12],
    ["src/pages/terima-kasih.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8ff0c95c-6808-41d8-8883-12fa4b41ecde",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
