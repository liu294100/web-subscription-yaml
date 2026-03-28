/*
 Navicat Premium Dump SQL

 Source Server         : ep-falling-sea-a12fncua-pooler.ap-southeast-1.aws.neon.tech
 Source Server Type    : PostgreSQL
 Source Server Version : 160012 (160012)
 Source Host           : ep-falling-sea-a12fncua-pooler.ap-southeast-1.aws.neon.tech:5432
 Source Catalog        : verceldb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160012 (160012)
 File Encoding         : 65001

 Date: 28/03/2026 10:47:55
*/


-- ----------------------------
-- Table structure for clash_yamls
-- ----------------------------
DROP TABLE IF EXISTS "public"."clash_yamls";
CREATE TABLE "public"."clash_yamls" (
  "id" int4 NOT NULL DEFAULT nextval('clash_yamls_id_seq'::regclass),
  "filename" text COLLATE "pg_catalog"."default" NOT NULL,
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) DEFAULT now()
)
;

-- ----------------------------
-- Records of clash_yamls
-- ----------------------------

-- ----------------------------
-- Table structure for proxy_sources
-- ----------------------------
DROP TABLE IF EXISTS "public"."proxy_sources";
CREATE TABLE "public"."proxy_sources" (
  "id" int4 NOT NULL DEFAULT nextval('proxy_sources_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "proxies" jsonb,
  "priority" int4 NOT NULL DEFAULT 0,
  "is_enabled" bool NOT NULL DEFAULT true,
  "created_at" timestamp(6) DEFAULT now()
)
;

-- ----------------------------
-- Records of proxy_sources
-- ----------------------------
INSERT INTO "public"."proxy_sources" VALUES (2, 'globalcnix', '["🔰 手动选择", "🎯 Direct"]', 2, 't', '2026-03-02 02:15:53.400294');
INSERT INTO "public"."proxy_sources" VALUES (1, 'cnix', '["IPv6 日本 A01 移动宽带优化", "IPv6 日本 A02 移动宽带优化", "IPv6 日本 A03 移动宽带优化", "IPv6 日本 A04 移动宽带优化", "IPv6 日本 A05 移动宽带优化", "IPv6 日本 A06 移动宽带优化", "加拿大 A01", "加拿大 A02", "加拿大 A03 电信+联通 BGP低延迟优化", "加拿大 A04 电信+联通 BGP低延迟优化", "加拿大 A05 电信+联通 BGP高带宽优化", "加拿大 A06 电信+联通 BGP高带宽优化", "印度 A01 IEPL专线", "印度 A02 IEPL专线", "印度 A03 IEPL专线", "印度 A04 IEPL专线", "印度 A05 IEPL专线", "印度 A06 IEPL专线", "台湾 A01", "台湾 A02", "台湾 A03", "台湾 A04", "台湾 A05", "台湾 A06", "台湾 A07", "台湾 A08", "台湾 A09", "台湾 A10", "台湾 A11", "台湾 A12", "台湾 A13", "台湾 A14", "台湾 A15", "台湾 A16", "台湾 A17", "台湾 A18", "台湾 A19", "台湾 A20", "台湾 A21", "台湾 A22", "台湾 A23", "台湾 A24", "台湾 A25", "台湾 A26", "台湾 A27", "台湾 A28", "台湾 A29", "台湾 A30", "德国 A01 IEPL专线", "德国 A02 IEPL专线", "德国 A03 IEPL专线", "德国 A04 IEPL专线", "德国 A05 IEPL专线", "德国 A06 IEPL专线", "新加坡 A01", "新加坡 A02", "新加坡 A03", "新加坡 A04", "新加坡 A05", "新加坡 A06", "新加坡 A07", "新加坡 A08", "新加坡 A09", "新加坡 A10", "新加坡 A11 IEPL专线", "新加坡 A12 IEPL专线", "新加坡 A13 IEPL专线", "新加坡 A14 IEPL专线", "新加坡 A15 IEPL专线", "新加坡 A16 IEPL专线", "新加坡 A17 IEPL专线", "新加坡 A18 IEPL专线", "新加坡 A19 IEPL专线", "新加坡 A20 IEPL专线", "日本 A01 移动路由 高带宽优化", "日本 A02 移动路由 高带宽优化", "日本 A03 电信+联通 BGP路由 高带宽优化", "日本 A04 电信+联通 BGP路由 高带宽优化", "日本 A05 电信+联通 BGP路由 高带宽优化", "日本 A06 联通+移动 BGP路由 延迟优化", "日本 A07 联通+移动 BGP路由 延迟优化", "日本 A08 联通+移动 BGP路由 延迟优化", "日本 A09 电信+移动 BGP路由 延迟优化", "日本 A10 电信+移动 BGP路由 延迟优化", "日本 A11 移动路由 高带宽优化", "日本 A12 移动路由 高带宽优化", "日本 A13 电信+联通 BGP路由 高带宽优化", "日本 A14 电信+联通 BGP路由 高带宽优化", "日本 A15 电信+联通 BGP路由 高带宽优化", "日本 A16 联通+移动 BGP路由 延迟优化", "日本 A17 联通+移动 BGP路由 延迟优化", "日本 A18 联通+移动 BGP路由 延迟优化", "日本 A19 电信+移动 BGP路由 延迟优化", "日本 A20 电信+移动 BGP路由 延迟优化", "日本 A21 移动路由 高带宽优化", "日本 A22 移动路由 高带宽优化", "日本 A23 电信+联通 BGP路由 高带宽优化", "日本 A24 电信+联通 BGP路由 高带宽优化", "日本 A25 电信+联通 BGP路由 高带宽优化", "日本 A26 联通+移动 BGP路由 延迟优化", "日本 A27 联通+移动 BGP路由 延迟优化", "日本 A28 联通+移动 BGP路由 延迟优化", "日本 A29 电信+移动 BGP路由 延迟优化", "日本 A30 电信+移动 BGP路由 延迟优化", "法国 A01 IEPL专线", "法国 A02 IEPL专线", "法国 A03 IEPL专线", "法国 A04 IEPL专线", "法国 A05 IEPL专线", "法国 A06 IEPL专线", "澳大利亚 A01 IEPL专线", "澳大利亚 A02 IEPL专线", "澳大利亚 A03 IEPL专线", "澳大利亚 A04 IEPL专线", "澳大利亚 A05 IEPL专线", "澳大利亚 A06 IEPL专线", "美国 A01 长稳定连接 高带宽优化", "美国 A02 长稳定连接 高带宽优化", "美国 A03 长稳定连接 高带宽优化", "美国 A04 Gemini 电信+联通 高带宽低延迟优化", "美国 A05 Gemini 电信+联通 高带宽低延迟优化", "美国 A06 Gemini 电信+联通 高带宽低延迟优化", "美国 A07 Gemini 联通 延迟优化", "美国 A08 Gemini 联通 延迟优化", "美国 A09 Gemini 移动 延迟优化", "美国 A10 Gemini 移动 延迟优化", "美国 A11 IEPL专线 Gemini", "美国 A12 IEPL专线 Gemini", "美国 A13 IEPL专线 Gemini", "美国 A14 IEPL专线 Gemini", "美国 A15 IEPL专线 Gemini", "美国 A16 IEPL专线 Gemini", "美国 A17 IEPL专线 Gemini", "美国 A18 IEPL专线 Gemini", "美国 A19 IEPL专线 Gemini", "美国 A20 IEPL专线 Gemini", "英国 A01 IEPL专线", "英国 A02 IEPL专线", "英国 A03 IEPL专线", "英国 A04 IEPL专线", "英国 A05 IEPL专线", "英国 A06 IEPL专线", "韩国 A01 移动+联通 BGP低延迟优化", "韩国 A02 移动+联通 BGP低延迟优化", "韩国 A03 电信+联通 BGP低延迟优化", "韩国 A04 电信+联通 BGP低延迟优化", "韩国 A05 电信+联通 BGP高带宽优化", "韩国 A06 电信+联通 BGP高带宽优化", "香港 A01 IEPL专线 联通优化", "香港 A02 IEPL专线 联通优化", "香港 A03 IEPL专线 联通优化", "香港 A04 IEPL专线 电信优化", "香港 A05 IEPL专线 电信优化", "香港 A06 IEPL专线 电信优化", "香港 A07 IEPL专线 移动优化", "香港 A08 IEPL专线 移动优化", "香港 A09 IEPL专线 联通优化", "香港 A10 IEPL专线 电信优化", "香港 A11 IEPL专线 联通优化", "香港 A12 IEPL专线 联通优化", "香港 A13 IEPL专线 联通优化", "香港 A14 IEPL专线 电信优化", "香港 A15 IEPL专线 电信优化", "香港 A16 IEPL专线 电信优化", "香港 A17 IEPL专线 移动优化", "香港 A18 IEPL专线 移动优化", "香港 A19 IEPL专线 联通优化", "香港 A20 IEPL专线 联通优化"]', 1, 't', '2026-03-02 02:03:53.67691');

-- ----------------------------
-- Table structure for st_overrides
-- ----------------------------
DROP TABLE IF EXISTS "public"."st_overrides";
CREATE TABLE "public"."st_overrides" (
  "id" int4 NOT NULL DEFAULT nextval('st_overrides_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "rule_url" text COLLATE "pg_catalog"."default" NOT NULL,
  "proxies" jsonb,
  "created_at" timestamp(6) DEFAULT now()
)
;

-- ----------------------------
-- Records of st_overrides
-- ----------------------------
INSERT INTO "public"."st_overrides" VALUES (4, '🎬 BiliBili', '独立的 BiliBili 分流规则，包含专用的策略组', 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/BiliBili/BiliBili.yaml', '[]', '2026-01-17 16:31:32.777773');
INSERT INTO "public"."st_overrides" VALUES (3, '🎵 Spotify', '独立的 Spotify 分流规则，包含专用的策略组', 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml', '[]', '2026-01-17 16:30:55.236933');
INSERT INTO "public"."st_overrides" VALUES (2, '🎬 TikTok', '独立的 TikTok 分流规则，包含专用的策略组', 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TikTok/TikTok.yaml', '[]', '2026-01-17 16:29:51.674608');
INSERT INTO "public"."st_overrides" VALUES (8, 'Steam', 'Steam', 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml', '[]', '2026-03-02 02:08:26.545681');
INSERT INTO "public"."st_overrides" VALUES (5, '🎬 DisneyPlus', 'DisneyPlus', 'https://raw.githubusercontent.com/liu294100/web-subscription-yaml/refs/heads/main/doc/rule/Disneyplus.yaml', '[]', '2026-03-02 02:05:04.077429');
INSERT INTO "public"."st_overrides" VALUES (6, '🎬  HBO', 'HBO', 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.yaml', NULL, '2026-03-02 02:13:37.268502');

-- ----------------------------
-- Primary Key structure for table clash_yamls
-- ----------------------------
ALTER TABLE "public"."clash_yamls" ADD CONSTRAINT "clash_yamls_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table proxy_sources
-- ----------------------------
ALTER TABLE "public"."proxy_sources" ADD CONSTRAINT "proxy_sources_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table st_overrides
-- ----------------------------
ALTER TABLE "public"."st_overrides" ADD CONSTRAINT "st_overrides_pkey" PRIMARY KEY ("id");
