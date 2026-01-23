"use client";

import { motion } from "framer-motion";

export function QuranicVerse() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="font-arabic text-3xl lg:text-4xl text-primary leading-loose mb-6">
            ﴾ وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا ﴿
          </div>
          <p className="text-xl text-muted-foreground mb-4">
           {` "And recite the Quran with measured recitation."`}
          </p>
          <p className="text-sm text-muted-foreground">
            Surah Al-Muzzammil (73:4)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
