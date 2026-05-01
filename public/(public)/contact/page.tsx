// src/app/(public)/contact/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Globe,
} from "lucide-react";

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    details: ["support@madrasahpro.com", "sales@madrasahpro.com"],
    description: "We respond within 24 hours",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+44 20 1234 5678"],
    description: "Mon-Fri, 9AM-6PM GMT",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Office",
    details: ["123 Islamic Center", "London, UK"],
    description: "Visit by appointment",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Support Hours",
    details: ["24/7 Technical Support", "Business Hours: 9AM-6PM"],
    description: "Available in multiple timezones",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-gradient bg-gradient-primary bg-clip-text">
                Get in Touch
              </span>
              <span className="block text-gray-900 dark:text-white">
                We&apos;re Here to Help
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Have questions about our platform? Need a demo? Our team is ready
              to assist you with anything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
              >
                <CardHeader>
                  <div
                    className={`mb-4 inline-flex rounded-xl p-3 ${
                      index === 0
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        : index === 1
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : index === 2
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Fill out the form and our team will get back to you as soon as
                  possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quick Response</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      We typically respond within 2-4 hours during business
                      hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Expert Support</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Our support team includes technical experts and education
                      specialists.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Global Coverage</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Support available in multiple languages and timezones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>Tell us how we can help you</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution (Optional)</Label>
                    <Input
                      id="institution"
                      placeholder="Your madrasah or organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your needs..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Common Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Quick answers to frequently asked questions
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                question: "How long does setup take?",
                answer:
                  "Most madrasahs are up and running within 24 hours. We provide guided setup assistance.",
              },
              {
                question: "Do you offer training?",
                answer:
                  "Yes, we provide comprehensive training for admins, teachers, and staff.",
              },
              {
                question: "Can we import existing data?",
                answer:
                  "Absolutely! We support CSV imports for students, teachers, and other data.",
              },
              {
                question: "Is there a mobile app?",
                answer:
                  "Yes, our platform is fully responsive and we have dedicated mobile apps coming soon.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {faq.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/help">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-primary p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-purple-100">
                Join hundreds of Islamic institutions using our platform to
                transform their educational delivery.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/register">Start Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
