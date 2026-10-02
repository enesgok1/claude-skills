---
name: sahip-belgeleri
description: Set up and maintain owner-facing project documents for a non-coding Turkish product owner - a roadmap/decision log (YOL-HARITASI.md), a detailed emoji to-do list (YAPILACAKLAR.md) and the project CLAUDE.md (rules, architecture, pitfalls, known issues). Use when starting a new project, when the owner asks for a plan, roadmap or to-do list ("yapılacaklar listesi", "yol haritası"), when a decision is made or a phase or task finishes, or when recording a fixed bug.
---

# Sahip İçin Belgeler

Sahip kod yazmaz ama projeyi yönetir. Belgeler hem onun projeyi takip etmesini sağlar hem de oturumlar arasında projenin hafızasıdır. Yeni bir oturum belgeleri okuyup kaldığı yerden devam edebilmelidir.

## Üç dosya, üç görev

| Dosya | Kimin için | İçerik |
|---|---|---|
| `CLAUDE.md` (proje kökü) | Claude | Kurallar, doğrulama kapısı, mimari ("nasıl çalışıyor"), kırılma noktaları, test tablosu, bilinen sorunlar, hesaplar ve ortam. `@docs/YOL-HARITASI.md` ile yol haritasını içe aktarır. |
| `docs/YOL-HARITASI.md` | Sahip + Claude | Alınan kararlar (tarihli, gerekçeli), aşamalar, sıradaki adım |
| `docs/YAPILACAKLAR.md` | Sahip | Ayrıntılı, emojili iş listesi. Sahibin işleri ve bekleyen kararlar en üstte. |

Sahibin okuduğu dosyalar Türkçe ve ürün diliyle yazılır. CLAUDE.md'de teknik ayrıntı serbesttir ama sahip okuyabilsin diye Türkçe tercih edilir. Kod tanımlayıcıları İngilizce kalır.

## YAPILACAKLAR.md kalıbı

```markdown
# ✅ <Proje>: Yapılacaklar Listesi

> 📌 Projenin ayrıntılı iş listesi. Bir iş bitince kutusunu işaretleyip tarihini yazarım. Kararlar ve gerekçeleri YOL-HARITASI.md'de.
>
> 🗓️ Son güncelleme: <tarih>

## 🔤 İşaretler
| İşaret | Anlamı |
|---|---|
| 👤 | Senin yapacağın iş |
| 🧭 | Senin vereceğin karar |
| ⚠️ | Dikkat: risk ya da kural |
| 💡 | Öneri: istersen ekleriz |
| 🔒 | Gizlilikle ilgili |
| 💰 | Para gerektiriyor |

İşareti olmayan işleri ben (Claude) yaparım.

## 📊 Genel durum
| Aşama | Durum |   ← ✅ Bitti · 🟡 Sürüyor (x/y) · ⏳ Bekliyor

## 🙋 Şu an senden beklenenler
1. <emoji> **Kısa başlık.** Ne yapacağı, neden gerektiği, nereden yapılacağı.

## 🧭 Bekleyen kararlar
1. **<emoji> Karar adı**
   - Neyi etkiliyor:
   - Önerim:
   - Ne zamana kadar:

## 1️⃣ <Aşama adı>
🎯 **Bitti sayılması için:** <ölçülebilir çıta>
### <Alt başlık>
- [ ] İş (gerekiyorsa 👤/🧭/⚠️/💡/🔒/💰)
- [x] Biten iş (<tarih>)

## 🛠️ Bakım ve teknik borç
## 🔭 Çıkıştan sonra: fikir havuzu
```

Kurallar:
- Her aşamanın başında **"Bitti sayılması için"** çıtası olur.
- Sahibin işleri ve kararları ayrı işaretlenir ve en üstte toplanır. Sahip tek bakışta "benden ne bekleniyor" görebilmeli.
- Biten iş silinmez: `[x]` ve tarihle işaretlenir. Durum tablosu da güncellenir.
- Doğrulanmamış iddia yazılmaz. Emin olunmayan bilgi "doğrulanacak" diye işaretlenir.
- Yeni çıkan iş doğru aşamaya hemen eklenir.

## YOL-HARITASI.md kalıbı
- **Alınan kararlar:** `- **Konu (YYYY-AA-GG):** Karar. Gerekçe. Neyi etkilediği.` Fikir değişirse eski kararı silme; yeni tarihli maddeyle güncelle ya da açıkla.
- **Aşamalar:** numaralı, `[ ]`/`[x]` ile.
- **Sıradaki adım:** tek paragraf; sahibin şu anki işlerine YAPILACAKLAR.md'den bağlantı.

## CLAUDE.md bölümleri (proje büyüdükçe)
1. Proje özeti ve farkı
2. Çalışma standardı (bilgisayar düzeyindeki kişisel standarttan farklı olan proje kuralları)
3. Git kuralları (push için onay)
4. **Doğrulama kapısı** tablosu: ne zaman, hangi komut, neyi yakalar
5. Ürün kuralları (gizlilik, dil, platform)
6. Kod standartları
7. **Kritik kırılma noktaları:** sürüme ve ortama özgü tuzaklar ve geçici çözümleri
8. Proje yapısı (açıklamalı ağaç)
9. **Mimari:** her modülün nasıl çalıştığı, değişmez kuralları, bilinçli sınırları
10. **Test altyapısı:** komutlar, test dosyası → neyi doğruladığı tablosu, toplam test sayısı ve tarihi
11. **Bilinen sorunlar ve teknik borç:** numaralı; durum işareti (🔴 açık ve önemli, 🟡 açık, ✅ çözüldü)
12. Hesaplar ve ortam (sır yazılmaz!)

## Hata kaydı kalıbı (düzeltilen önemli hatalar için)
```markdown
#### N. <Kısa başlık> ✅ (<tarih>)
- **Dosya:** `yol/dosya.ts`
- **Belirti:** Sahibin ya da kullanıcının gördüğü şey
- **Kök neden:** Neden oldu (belirtiyi değil nedeni yaz)
- **Çözüm:** Ne değişti
- **Doğrulama:** Nasıl doğrulandı (test, komut, cihaz) ve sonuç
- **Ders:** Bundan sonra neye dikkat edilecek (varsa kırılma noktalarına da ekle)
```

## Güncelleme disiplini
- Karar alınınca → YOL-HARITASI.md. İş bitince → YAPILACAKLAR.md (`[x]` + tarih + durum tablosu). Yeni modül, kural ya da tuzak öğrenilince → CLAUDE.md. **Hepsi aynı oturumda.**
- Belgede sayı varsa (test sayısı, eklenti sayısı) gerçek komut çıktısıyla eşleşmeli.
- GitHub'da düzgün göründüğünü kontrol et (tablolar, onay kutuları): `gh api markdown -f mode=gfm -F text=@docs/YAPILACAKLAR.md`.
- Sahibe teslim ederken ne değiştiğini birkaç maddeyle özetle. Belgenin tamamını sohbete kopyalama.
