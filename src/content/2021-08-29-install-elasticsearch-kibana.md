---
templateKey: blog-post
id: 2021/08/29/01
title: Mac に Elasticsearch と Kibana をインストールする
slug: /2021/08/29/01
date: 2021-08-29T19:25:00.125Z
headerImage: "https://imgur.com/tO726Qj.png"
description: ""
tags:
  - elasticsearch
  - kibana
  - mac
---

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.elastic.co/jp/elastic-stack" data-iframely-url="//cdn.iframe.ly/EFFhqsM"></a></div></div>

Elasticsearch と Kibana を Mac にインストールします。

公式サイトからバイナリをインストールして、無事に動作するところまでを実施します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [インストールするバージョン](#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3)
- [Elasticsearch のインストール](#elasticsearch-%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
- [Kibana のインストール](#kibana-%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
- [Dev Tool にアクセス](#dev-tool-%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)
- [その他](#%E3%81%9D%E3%81%AE%E4%BB%96)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## インストールするバージョン

- Elasticsearch: 7.14.0
- Kibana: 7.14.0

## Elasticsearch のインストール

公式サイトからバイナリをダウンロードします。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.elastic.co/downloads/elasticsearch" data-iframely-url="//cdn.iframe.ly/dEv9yYX"></a></div></div>

brew からでもインストールできますが、後続にインストールする Kibana とのバージョンが合わなかったため、バイナリからダウンロードします。
（ちなみに brew からは `brew install elasticsearch` でダウンロードできます。）

ダウンロードが完了したら、任意のディレクトリで gzip ファイルを解凍します。

```bash
tar zxvf elasticsearch-7.14.0-darwin-x86_64.tar.gz
```

解凍が完了したら、ディレクトリにあるバイナリファイルより起動します。

```bash
cd elasticsearch-7.14.0/
./bin/elasticsearch
```

その後は別ターミナルで、動作確認します。

デフォルトの 9200 ポートに `curl` 実行します。

```bash
$ curl http://localhost:9200/
{
  "name" : "macbook-pro.local",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "K-7x8fPlTL2dvUBX7asxKQ",
  "version" : {
    "number" : "7.14.0",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "dd5a0a2acaa2045ff9624f3729fc8a6f40835aa1",
    "build_date" : "2021-07-29T20:49:32.864135063Z",
    "build_snapshot" : false,
    "lucene_version" : "8.9.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

## Kibana のインストール

公式サイトからバイナリをダウンロードします。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.elastic.co/downloads/kibana" data-iframely-url="//cdn.iframe.ly/ww8TqRi"></a></div></div>

ダウンロードした gzip を任意のディレクトリで解凍します。
ファイルサイズが大きいので、少し時間がかかりました。

```bash
tar zxvf kibana-7.14.0-darwin-x86_64.tar.gz
```

解凍が完了したら、ディレクトリにあるバイナリファイルより起動します。

```bash
$ cd kibana-7.14.0-darwin-x86_64
$ ./bin/kibana
  log   [18:37:55.484] [info][plugins-service] Plugin "metricsEntities" is disabled.
  log   [18:37:55.528] [warning][config][deprecation] plugins.scanDirs is deprecated and is no longer used
  log   [18:37:55.530] [warning][config][deprecation] Config key [monitoring.cluster_alerts.email_notifications.email_address] will be required for email notifications to work in 8.0."
  log   [18:37:55.530] [warning][config][deprecation] "xpack.reporting.roles" is deprecated. Granting reporting privilege through a "reporting_user" role will not be supported starting in 8.0. Please set "xpack.reporting.roles.enabled" to "false" and grant reporting privileges to users using Kibana application privileges **Management > Security > Roles**.
  log   [18:37:55.594] [info][server][NotReady][http] http server running at http://localhost:5601
  log   [18:37:55.983] [info][plugins-system] Setting up [106] plugins: [translations,taskManager,licensing,globalSearch,globalSearchProviders,banners,licenseApiGuard,code,usageCollection,xpackLegacy,telemetryCollectionManager,telemetryCollectionXpack,kibanaUsageCollection,securityOss,share,screenshotMode,telemetry,newsfeed,mapsEms,mapsLegacy,legacyExport,kibanaLegacy,embeddable,uiActionsEnhanced,expressions,charts,esUiShared,bfetch,data,savedObjects,visualizations,visTypeXy,visTypeVislib,visTypeTimelion,features,visTypeTagcloud,visTypeTable,visTypePie,visTypeMetric,visTypeMarkdown,tileMap,regionMap,presentationUtil,timelion,home,searchprofiler,painlessLab,grokdebugger,graph,visTypeVega,management,watcher,licenseManagement,indexPatternManagement,advancedSettings,discover,discoverEnhanced,dashboard,dashboardEnhanced,visualize,visTypeTimeseries,savedObjectsManagement,spaces,security,transform,savedObjectsTagging,lens,reporting,canvas,lists,ingestPipelines,fileUpload,maps,dataVisualizer,encryptedSavedObjects,dataEnhanced,timelines,dashboardMode,cloud,upgradeAssistant,snapshotRestore,fleet,indexManagement,rollup,remoteClusters,crossClusterReplication,indexLifecycleManagement,enterpriseSearch,eventLog,actions,alerting,triggersActionsUi,stackAlerts,ruleRegistry,osquery,ml,cases,securitySolution,observability,uptime,infra,monitoring,logstash,console,apmOss,apm]
  log   [18:37:55.987] [info][plugins][taskManager] TaskManager is identified by the Kibana UUID: f3371839-e8e3-4206-ad12-794669840432
  log   [18:38:02.360] [warning][config][plugins][security] Generating a random key for xpack.security.encryptionKey. To prevent sessions from being invalidated on restart, please set xpack.security.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.361] [warning][config][plugins][security] Session cookies will be transmitted over insecure connections. This is not recommended.
  log   [18:38:02.479] [warning][config][plugins][reporting] Generating a random key for xpack.reporting.encryptionKey. To prevent sessions from being invalidated on restart, please set xpack.reporting.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.507] [info][config][plugins][reporting] Chromium sandbox provides an additional layer of protection, and is supported for Darwin OS. Automatically enabling Chromium sandbox.
  log   [18:38:02.529] [warning][encryptedSavedObjects][plugins] Saved objects encryption key is not set. This will severely limit Kibana functionality. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.698] [warning][actions][actions][plugins] APIs are disabled because the Encrypted Saved Objects plugin is missing encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.720] [warning][alerting][alerting][plugins][plugins] APIs are disabled because the Encrypted Saved Objects plugin is missing encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:08.977] [info][plugins][ruleRegistry] Write is disabled, not installing assets
  log   [18:38:09.635] [info][savedobjects-service] Waiting until all Elasticsearch nodes are compatible with Kibana before starting saved objects migrations...
  log   [18:38:10.486] [error][savedobjects-service] This version of Kibana (v7.14.0) is incompatible with the following Elasticsearch nodes in your cluster: v7.10.2 @ 127.0.0.1:9200 (127.0.0.1)
```

## Dev Tool にアクセス

[http://localhost:5601/app/dev_tools#/console](http://localhost:5601/app/dev_tools#/console) より、Dev Tool にアクセスできます。

![https://imgur.com/1eY4wLr.png](https://imgur.com/1eY4wLr.png)

左のペインがリクエスト、右のペインがレスポンスになっています。

## その他

はじめは、Elasticsearch を brew でインストールして試したのですが、
Elasticsearch 起動後に、Kibana を起動したらエラーが発生しました。

```bash
$ cd kibana-7.14.0-darwin-x86_64
$ ./bin/kibana
  log   [18:37:55.484] [info][plugins-service] Plugin "metricsEntities" is disabled.
  log   [18:37:55.528] [warning][config][deprecation] plugins.scanDirs is deprecated and is no longer used
  log   [18:37:55.530] [warning][config][deprecation] Config key [monitoring.cluster_alerts.email_notifications.email_address] will be required for email notifications to work in 8.0."
  log   [18:37:55.530] [warning][config][deprecation] "xpack.reporting.roles" is deprecated. Granting reporting privilege through a "reporting_user" role will not be supported starting in 8.0. Please set "xpack.reporting.roles.enabled" to "false" and grant reporting privileges to users using Kibana application privileges **Management > Security > Roles**.
  log   [18:37:55.594] [info][server][NotReady][http] http server running at http://localhost:5601
  log   [18:37:55.983] [info][plugins-system] Setting up [106] plugins: [translations,taskManager,licensing,globalSearch,globalSearchProviders,banners,licenseApiGuard,code,usageCollection,xpackLegacy,telemetryCollectionManager,telemetryCollectionXpack,kibanaUsageCollection,securityOss,share,screenshotMode,telemetry,newsfeed,mapsEms,mapsLegacy,legacyExport,kibanaLegacy,embeddable,uiActionsEnhanced,expressions,charts,esUiShared,bfetch,data,savedObjects,visualizations,visTypeXy,visTypeVislib,visTypeTimelion,features,visTypeTagcloud,visTypeTable,visTypePie,visTypeMetric,visTypeMarkdown,tileMap,regionMap,presentationUtil,timelion,home,searchprofiler,painlessLab,grokdebugger,graph,visTypeVega,management,watcher,licenseManagement,indexPatternManagement,advancedSettings,discover,discoverEnhanced,dashboard,dashboardEnhanced,visualize,visTypeTimeseries,savedObjectsManagement,spaces,security,transform,savedObjectsTagging,lens,reporting,canvas,lists,ingestPipelines,fileUpload,maps,dataVisualizer,encryptedSavedObjects,dataEnhanced,timelines,dashboardMode,cloud,upgradeAssistant,snapshotRestore,fleet,indexManagement,rollup,remoteClusters,crossClusterReplication,indexLifecycleManagement,enterpriseSearch,eventLog,actions,alerting,triggersActionsUi,stackAlerts,ruleRegistry,osquery,ml,cases,securitySolution,observability,uptime,infra,monitoring,logstash,console,apmOss,apm]
  log   [18:37:55.987] [info][plugins][taskManager] TaskManager is identified by the Kibana UUID: f3371839-e8e3-4206-ad12-794669840432
  log   [18:38:02.360] [warning][config][plugins][security] Generating a random key for xpack.security.encryptionKey. To prevent sessions from being invalidated on restart, please set xpack.security.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.361] [warning][config][plugins][security] Session cookies will be transmitted over insecure connections. This is not recommended.
  log   [18:38:02.479] [warning][config][plugins][reporting] Generating a random key for xpack.reporting.encryptionKey. To prevent sessions from being invalidated on restart, please set xpack.reporting.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.507] [info][config][plugins][reporting] Chromium sandbox provides an additional layer of protection, and is supported for Darwin OS. Automatically enabling Chromium sandbox.
  log   [18:38:02.529] [warning][encryptedSavedObjects][plugins] Saved objects encryption key is not set. This will severely limit Kibana functionality. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.698] [warning][actions][actions][plugins] APIs are disabled because the Encrypted Saved Objects plugin is missing encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:02.720] [warning][alerting][alerting][plugins][plugins] APIs are disabled because the Encrypted Saved Objects plugin is missing encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command.
  log   [18:38:08.977] [info][plugins][ruleRegistry] Write is disabled, not installing assets
  log   [18:38:09.635] [info][savedobjects-service] Waiting until all Elasticsearch nodes are compatible with Kibana before starting saved objects migrations...
  log   [18:38:10.486] [error][savedobjects-service] This version of Kibana (v7.14.0) is incompatible with the following Elasticsearch nodes in your cluster: v7.10.2 @ 127.0.0.1:9200 (127.0.0.1)
```

Elasticsearch とのバージョンが合っていないことが原因でした。
Elasticsearch は brew からインストールしたものを使用しており、Kibana は公式サイトからのバイナリをダウンロードしたものを使用してました。

```bash
$ elasticsearch --version
warning: no-jdk distributions that do not bundle a JDK are deprecated and will be removed in a future release
Version: 7.10.2-SNAPSHOT, Build: oss/tar/unknown/2021-01-16T01:34:41.142971Z, JVM: 16.0.2
```

brew からインストールできる最新のバージョンは `7.10.2` のようでした。

```bash
$ brew upgrade elasticsearch
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/cask-versions and homebrew/cask).
==> Updated Casks
Updated 2 casks.

Warning: elasticsearch 7.10.2 already installed
```

Kibana のバージョンは `7.14.0` です。

```bash
$ ./bin/kibana --version
7.14.0
```

ということで、brew からのインストールではなく、バイナリをダウンロードして実行する方法に切り替えて記事を書きました。

## Reference

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://dev.classmethod.jp/articles/es-01/" data-iframely-url="//cdn.iframe.ly/ILpNaU5"></a></div></div>
