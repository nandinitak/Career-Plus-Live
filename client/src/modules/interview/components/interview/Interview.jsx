import { Link } from "react-router-dom";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2, Rabbit, ShieldAlert } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { listScenarios } from "@/helpers/scenarioAPI";
import { LoadingButton } from "@/components/ui/loading-button";
const FormSchema = z.object({
  scenario: z.string({
    required_error: "Select a Job Scenario",
  }),
  interviewer: z.string({
    required_error: "Select an Interviewer Profile",
  }),
});

function Interview({ userId }) {
  const [date, setDate] = useState();
  const [scenarios, setScenarios] = useState([]);
  const navigate = useNavigate();
  const [sessions, setsessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const handleOpen = () => setIsOpen(true);
  // const handleClose = () => {
  // 	setIsOpen(false);
  // };

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await listScenarios(userId);
        setScenarios(response);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setScenarios([]);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, [userId]);

  const handleStartSession = (_id) => {
    navigate(`./session?interviewSessionId=${_id}`);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  useEffect(() => {
    // Fetch sessions from the server
    const fetchsessions = async () => {
      try {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_BACKEND_URI}/interview?user=${userId}`,
          headers: {},
        };
        const response = await axios.request(config);
        setsessions(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setsessions([]); // No scenarios found
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchsessions();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p className="text-sm">Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-2">
        <ShieldAlert className="h-5 w-5" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl gradient-text">
          Interview
        </h1>
        <Button
          onclick={(window.href = "http://localhost:5173/community")}
        ></Button>
      </div>
    </main>
  );
}

export default Interview;
