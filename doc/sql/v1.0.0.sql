/*
 Navicat Premium Dump SQL

 Source Server         : ep-falling-sea-a12fncua-pooler.ap-southeast-1.aws.neon.tech
 Source Server Type    : PostgreSQL
 Source Server Version : 160011 (160011)
 Source Host           : ep-falling-sea-a12fncua-pooler.ap-southeast-1.aws.neon.tech:5432
 Source Catalog        : verceldb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160011 (160011)
 File Encoding         : 65001

 Date: 18/01/2026 10:41:45
*/


-- ----------------------------
-- Table structure for proxy_sources
-- ----------------------------
DROP TABLE IF EXISTS "public"."proxy_sources";
CREATE TABLE "public"."proxy_sources" (
  "id" int4 NOT NULL DEFAULT nextval('proxy_sources_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "proxies" jsonb,
  "is_enabled" bool NOT NULL DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "priority" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of proxy_sources
-- ----------------------------
INSERT INTO "public"."proxy_sources" VALUES (2, 'COMM', '["🔰 手动选择", "🎯 Direct"]', 't', '2026-01-18 02:25:38.988969', 1);
INSERT INTO "public"."proxy_sources" VALUES (1, 'CNIX', '["IPv6 日本 A01 移动宽带优化", "IPv6 日本 A02 移动宽带优化", "IPv6 日本 A03 移动宽带优化", "IPv6 日本 A04 移动宽带优化", "IPv6 日本 A05 移动宽带优化", "IPv6 日本 A06 移动宽带优化", "加拿大 A01", "加拿大 A01 (副本)", "加拿大 A02", "加拿大 A03", "加拿大 A04", "加拿大 A05", "加拿大 A06", "台湾 A01", "台湾 A02", "台湾 A03", "台湾 A04", "台湾 A05", "台湾 A06", "台湾 A07", "台湾 A08", "台湾 A09", "台湾 A10", "台湾 A11", "台湾 A12", "台湾 A13", "台湾 A14", "台湾 A15", "台湾 A16", "台湾 A17", "台湾 A18", "台湾 A19", "台湾 A20", "台湾 A22", "台湾 A23", "台湾 A24", "台湾 A25", "台湾 A26", "台湾 A27", "台湾 A28", "台湾 A29", "台湾 A30", "德国 A01", "德国 A02", "德国 A03", "德国 A04", "德国 A05", "德国 A06", "新加坡 A01", "新加坡 A02", "新加坡 A03", "新加坡 A04", "新加坡 A05", "新加坡 A06", "新加坡 A07", "新加坡 A08", "新加坡 A09", "新加坡 A10", "新加坡 A11 特殊端口Apple规则专线承载测试", "新加坡 A11 特殊端口Apple规则专线承载测试 (副本)", "新加坡 A12 特殊端口Apple规则专线承载测试", "新加坡 A13 特殊端口Apple规则专线承载测试", "新加坡 A14 特殊端口Apple规则专线承载测试", "新加坡 A15 特殊端口Apple规则专线承载测试", "新加坡 A16 特殊端口Apple规则专线承载测试", "新加坡 A17 特殊端口Apple规则专线承载测试", "新加坡 A18特殊端口Apple规则专线承载测试", "新加坡 A19 特殊端口Apple规则专线承载测试", "新加坡 A20 特殊端口Apple规则专线承载测试", "日本 A01", "日本 A02", "日本 A03", "日本 A04", "日本 A05", "日本 A06", "日本 A07", "日本 A08", "日本 A09", "日本 A10", "日本 A11", "日本 A12", "日本 A13", "日本 A14", "日本 A15", "日本 A16", "日本 A17", "日本 A18", "日本 A19", "日本 A20", "日本 移动宽带特化 A01", "日本 移动宽带特化 A02", "日本 移动宽带特化 A03", "日本 移动宽带特化 A04", "日本 移动宽带特化 A05", "日本 移动宽带特化 A06", "日本 移动宽带特化 A07", "日本 移动宽带特化 A08", "日本 移动宽带特化 A09", "日本 移动宽带特化 A10", "美国 A01 Youtube无广告", "美国 A02 Youtube无广告", "美国 A03 Youtube无广告", "美国 A04 Youtube无广告", "美国 A05 Gemini", "美国 A06 Gemini", "美国 A07 Gemini", "美国 A08 Gemini", "美国 A09 Youtube无广告", "美国 A10 Youtube无广告", "美国 A11 Youtube无广告", "美国 A12 Youtube无广告", "美国 A13 Gemini 移动宽带优化", "美国 A14 Gemini 移动宽带优化", "美国 A15 Gemini 移动宽带优化", "美国 A16 Gemini 移动宽带优化", "美国 A17 Youtube无广告", "美国 A18 Youtube无广告", "美国 A19 Youtube无广告", "美国 A20 Youtube无广告", "香港 A01 IEPL专线 联通优化", "香港 A02 IEPL专线 联通优化", "香港 A03  IEPL专线 联通优化", "香港 A04 IEPL专线 电信优化", "香港 A05 IEPL专线 电信优化", "香港 A06 IEPL专线 电信优化", "香港 A07 IEPL专线 移动优化", "香港 A08 IEPL专线 移动优化", "香港 A09 IEPL专线 联通优化", "香港 A10 IEPL专线 电信优化", "香港 A11 IEPL专线 联通优化", "香港 A12 IEPL专线 联通优化", "香港 A13 IEPL专线 联通优化", "香港 A14 IEPL专线 电信优化", "香港 A15 IEPL专线 电信优化", "香港 A16 IEPL专线 电信优化", "香港 A17 IEPL专线 移动优化", "香港 A18 IEPL专线 移动优化", "香港 A19 IEPL专线 联通优化", "香港 A20 IEPL专线 联通优化"]', 't', '2026-01-18 02:24:10.311712', 2);

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

-- ----------------------------
-- Primary Key structure for table proxy_sources
-- ----------------------------
ALTER TABLE "public"."proxy_sources" ADD CONSTRAINT "proxy_sources_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table st_overrides
-- ----------------------------
ALTER TABLE "public"."st_overrides" ADD CONSTRAINT "st_overrides_pkey" PRIMARY KEY ("id");
