"use client"

import { motion } from 'framer-motion'
import { Flame, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary">
                <Flame className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">CookSmart</span>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Helping Indian households discover sustainable, cost-effective cooking alternatives. 
              Join the clean cooking revolution today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Calculator</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Dealers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Government Schemes</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Reviews</a></li>
            </ul>
          </motion.div>

          {/* Cooking Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Cooking Options</h4>
            <ul className="space-y-3 text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">🌿 Biogas Plants</a></li>
              <li><a href="#" className="hover:text-background transition-colors">☀️ Solar Cookers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">⚡ Electric Induction</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Compare Options</a></li>
              <li><a href="#" className="hover:text-background transition-colors">EMI Calculator</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-background/60 text-sm">
            © 2024 CookSmart. All rights reserved.
          </p>
          <p className="text-background/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for a cleaner India
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
