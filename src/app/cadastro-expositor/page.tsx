"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Briefcase } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useExpositorForm } from "./hooks/use-expositor-form";
import { ExpositorForm } from "./components/expositor-form";

export default function ExhibitorRegistration() {
  const router = useRouter();
  const formState = useExpositorForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="amazon-gradient text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-white hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-100">
            <div className="text-center mb-8">
              <div className="amazon-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Cadastro de Expositor
              </h1>
              <p className="text-gray-600">
                Participe da feira como empresa ou produtor autônomo
              </p>
            </div>

            <ExpositorForm {...formState} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
