import React from "react";
import { Gallery } from "./Gallery";

export default {
  title: "Gallery",
  component: Gallery,
};

const images = {
  playWithWater: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/DSCF2203-1.jpg",
    width: 1879,
    height: 1238,
  },
  shopping: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/shopping.jpg",
    width: 1746,
    height: 1746,
  },
  quyuan: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/from-the-past/quyuan.webp",
    width: 4126,
    height: 6262,
  },
  stone: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/from-the-past/stone.webp",
    renderedWidth: 300,
    width: 5536,
    height: 4126,
  },
  weapons: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/from-the-past/weapon.webp",
    width: 6155,
    height: 4126,
  },
  roof: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/DSCF1807.RAF.jpg",
    width: 6262,
    height: 3278,
  },
  chess: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/checkmate.webp",
    width: 6262,
    height: 4126,
  },
  swimmer: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/swimmer.jpg",
    width: 6081,
    height: 4126,
  },
  player: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/player-min.webp",
    width: 2692,
    height: 3546,
  },
  players: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/players.jpg",
    width: 3368,
    height: 2344,
  },
  fishing: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/p2705047873.webp",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/p2705047873.webp?x-oss-process=style/thumbnail",
    width: 1080,
    height: 720,
  },
  dragonRiver: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/164-2.jpg",
    width: 4021,
    height: 4021,
  },
  waterLine: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/p2704851973.webp",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/p2704851973.webp?x-oss-process=style/thumbnail",
    renderedWidth: 500,
    width: 1080,
    height: 720,
  },
  phone: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/301/DSCF1355.RAF.min.jpg",
    width: 924,
    height: 619,
  },
  riverAndBoats: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/x2705749244.jpg",
    renderedWidth: 800,
    width: 1080,
    height: 830,
  },
  riverSide: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/x2705752731.jpg",
    renderedWidth: 400,
    width: 1080,
    height: 720,
  },
  quilt: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/x2710816755.jpg",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/x2710816755.jpg?x-oss-process=style/thumbnail",
    renderedWidth: 490,
    width: 1080,
    height: 832,
  },
  bridge: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/p2705529760.webp",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/p2705529760.webp?x-oss-process=style/thumbnail",
    renderedWidth: 450,
    width: 1080,
    height: 726,
  },
  building: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211025194518.jpg",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211025194518.jpg?x-oss-process=style/thumbnail",
    width: 3019,
    height: 2293,
  },
  chair: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/301/room-301.jpg",
    renderedWidth: 490,
    width: 970,
    height: 745,
  },
  smoking: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/DSCF1383.jpg",
    width: 2023,
    height: 2670,
  },
  jzBridge: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/DSCF1401.jpg",
    width: 5980,
    height: 3699,
    renderedWidth: 700,
  },
  motorcycle: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/4688FF3F-8EF5-4F63-B726-9AC275C1A97E-50268-000009856F7D5885.jpg",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/4688FF3F-8EF5-4F63-B726-9AC275C1A97E-50268-000009856F7D5885.jpg?x-oss-process=style/thumbnail",
    width: 1306,
    height: 821,
  },
  cycle: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/3922C86B-79D5-455F-9FA8-7EB405CE95A6-38852-000007863DB50E30.jpg",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/3922C86B-79D5-455F-9FA8-7EB405CE95A6-38852-000007863DB50E30.jpg?x-oss-process=style/thumbnail",
    renderedWidth: 400,
    width: 1501,
    height: 1144,
  },
  streetGames: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/B3AACBCA-807B-44C0-9CA2-E1F7E0C00C93_black.jpg",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/B3AACBCA-807B-44C0-9CA2-E1F7E0C00C93_black.jpg?x-oss-process=style/thumbnail",
    width: 898,
    height: 729,
  },
  corner: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/E2FDA467-AD6D-4410-9B50-66E1624C13D6-38852-0000078630EDA7C4.jpg",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/E2FDA467-AD6D-4410-9B50-66E1624C13D6-38852-0000078630EDA7C4.jpg?x-oss-process=style/thumbnail",
    renderedWidth: 500,
    width: 1776,
    height: 1184,
  },
  localDishes: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/IMG_3869.JPG",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/county-town/IMG_3869.JPG?x-oss-process=style/thumbnail",
    renderedWidth: 490,
    width: 897,
    height: 720,
  },
  oldMan: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/before-the-light/IMG_1844.jpg?x-oss-process=style/webp",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/before-the-light/IMG_1844.jpg?x-oss-process=style/thumbnail",
    renderedWidth: 400,
    width: 2673,
    height: 3564,
  },
  oldWomen: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/before-the-light/IMG_E1668.JPG?x-oss-process=style/webp",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/before-the-light/IMG_E1668.JPG?x-oss-process=style/thumbnail",
    width: 1325,
    height: 1960,
  },
  littleChild: {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/before-the-light/IMG_E1677.JPG",
    thumbnailSrc:
      "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/before-the-light/IMG_E1677.JPG?x-oss-process=style/thumbnail",
    width: 2801,
    renderedWidth: 600,
    height: 2801,
  },
};

export const Default = () => {
  return <Gallery images={Object.values(images)} />;
};
